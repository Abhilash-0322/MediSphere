from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase app with service account credentials
cred = credentials.Certificate('health12x-firebase-adminsdk-g9ljh-f124cecc94.json')  # Replace with your Firebase service account file
firebase_admin.initialize_app(cred)
db = firestore.client()

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

app = FastAPI()

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (use cautiously)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic Pydantic Models
class UserRegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    age: int
    gender: str

class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserProfileUpdateRequest(BaseModel):
    name: Optional[str]
    age: Optional[int]

class SymptomRequest(BaseModel):
    patient_id: str
    symptoms: List[str]

class FeedbackRequest(BaseModel):
    user_id: str
    message: str

# Specialization Enum
class Specialization(str, Enum):
    dentist = "Dentist"
    psychologist = "Psychologist"
    general_physician = "General Physician"
    orthopedist = "Orthopedist"

# Doctor Model
class DoctorModel(BaseModel):
    name: str
    speciality: Specialization
    email: str
    contact: Optional[str]
    availability: List[str]

# Appointment Model
class AppointmentRequest(BaseModel):
    patient_id: str
    doctor_id: str
    date_time: str
    notes: Optional[str]

# Mocked token for demonstration
MOCK_TOKEN = "sample-token"

def authenticate(authorization: str = Header(...)):
    if not authorization.startswith("Bearer ") or authorization.split(" ")[1] != MOCK_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid token")
    return True

# Register endpoint
@app.post("/register")
async def register_user(user: UserRegisterRequest):
    user_doc = db.collection('users').where('email', '==', user.email).get()
    if user_doc:
        raise HTTPException(status_code=400, detail="Email already registered.")
    user_data = {
        "name": user.name,
        "email": user.email,
        "password": user.password,  # In production, hash the password!
        "age": user.age,
        "gender": user.gender
    }
    new_user_ref = db.collection('users').add(user_data)
    return {"message": "User registered successfully", "user_id": new_user_ref[1].id}

# Login endpoint
@app.post("/login")
async def login_user(login: UserLoginRequest):
    user_doc = db.collection('users').where('email', '==', login.email).where('password', '==', login.password).get()
    if not user_doc:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "token": MOCK_TOKEN}

# Logout endpoint
@app.post("/logout")
async def logout_user(authenticated: bool = Depends(authenticate)):
    return {"message": "User logged out successfully"}

# Get user profile endpoint
@app.get("/user/{user_id}")
async def get_user_profile(user_id: str, authenticated: bool = Depends(authenticate)):
    user_doc = db.collection('users').document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found.")
    return user_doc.to_dict()

# Update user profile endpoint
@app.put("/user/{user_id}")
async def update_user_profile(user_id: str, update: UserProfileUpdateRequest, authenticated: bool = Depends(authenticate)):
    user_ref = db.collection('users').document(user_id)
    user_doc = user_ref.get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found.")
    update_data = update.dict(exclude_unset=True)
    user_ref.update(update_data)
    return {"message": "User profile updated successfully"}

# Submit symptoms endpoint
@app.post("/submit-symptoms")
async def receive_symptoms(request: SymptomRequest, authenticated: bool = Depends(authenticate)):
    symptom_data = {
        "patient_id": request.patient_id,
        "symptoms": request.symptoms,
        "status": "Processing"
    }
    db.collection('symptoms').add(symptom_data)
    return {"message": f"Symptoms for patient {request.patient_id} received.", "received_symptoms": request.symptoms, "status": "Processing"}

# Get symptom history endpoint
@app.get("/symptoms/history/{user_id}")
async def get_symptom_history(user_id: str, authenticated: bool = Depends(authenticate)):
    symptoms_docs = db.collection('symptoms').where('patient_id', '==', user_id).stream()
    symptom_history = [doc.to_dict() for doc in symptoms_docs]
    return {"user_id": user_id, "history": symptom_history}

# Endpoint to Retrieve Doctors by Specialization
@app.get("/doctors/speciality/{speciality}")
async def get_doctors_by_speciality(speciality: Specialization):
    doctors = db.collection('doctors').where('speciality', '==', speciality).stream()
    doctors_list = [doc.to_dict() for doc in doctors]
    if not doctors_list:
        raise HTTPException(status_code=404, detail="No doctors found for this speciality.")
    return {"speciality": speciality, "doctors": doctors_list}

# Endpoint to Book an Appointment
@app.post("/appointments/book")
async def book_appointment(appointment: AppointmentRequest):
    doctor_ref = db.collection('doctors').document(appointment.doctor_id)
    doctor_doc = doctor_ref.get()
    if not doctor_doc.exists:
        raise HTTPException(status_code=404, detail="Doctor not found.")
    appointment_data = {
        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,
        "date_time": appointment.date_time,
        "notes": appointment.notes,
        "status": "Booked"
    }
    new_appointment_ref = db.collection('appointments').add(appointment_data)
    return {"message": "Appointment booked successfully", "appointment_id": new_appointment_ref[1].id}

# Endpoint to fetch appointments for a specific doctor
@app.get("/appointments/{doctor_id}")
async def get_doctor_appointments(doctor_id: str, authenticated: bool = Depends(authenticate)):
    appointments = db.collection('appointments').where('doctor_id', '==', doctor_id).stream()
    doctor_appointments = [appt.to_dict() for appt in appointments]
    return {"doctor_id": doctor_id, "appointments": doctor_appointments}

# Endpoint to Cancel an Appointment
@app.delete("/appointments/{appointment_id}/cancel")
async def cancel_appointment(appointment_id: str):
    appointment_ref = db.collection('appointments').document(appointment_id)
    appointment_doc = appointment_ref.get()
    if not appointment_doc.exists:
        raise HTTPException(status_code=404, detail="Appointment not found.")
    appointment_ref.delete()
    return {"message": "Appointment canceled successfully", "appointment_id": appointment_id}

# Get notifications endpoint
@app.get("/notifications/{user_id}")
async def get_notifications(user_id: str, authenticated: bool = Depends(authenticate)):
    notifications = db.collection('notifications').where('user_id', '==', user_id).stream()
    user_notifications = [notif.to_dict() for notif in notifications]
    return {"notifications": user_notifications}

# Submit feedback endpoint
@app.post("/feedback")
async def submit_feedback(feedback: FeedbackRequest, authenticated: bool = Depends(authenticate)):
    db.collection('feedback').add(feedback.dict())
    return {"message": "Feedback submitted. Thank you for your input."}

# Test route to fetch all submitted symptoms for testing purposes
@app.get("/test/symptoms")
async def get_all_symptoms(authenticated: bool = Depends(authenticate)):
    all_symptoms_docs = db.collection('symptoms').stream()
    all_symptoms = [doc.to_dict() for doc in all_symptoms_docs]
    return {"total_symptoms_submissions": len(all_symptoms), "submissions": all_symptoms}