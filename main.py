from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
import time
import firebase_admin
from firebase_admin import credentials, db
from make_pdf import fetch_last_prescription, create_prescription_pdf, upload_to_google_drive
from serial_reader import HeartRateReader
import dotenv

# Load environment variables from .env file
dotenv.load_dotenv()

# File path where Firebase expects the credentials
firebase_json_path = "health12x-firebase-adminsdk-g9ljh-f124cecc94.json"

# Only write the file if it doesn't already exist
if not os.path.exists(firebase_json_path):
    with open("health12x-firebase-adminsdk-g9ljh-f124cecc94.json", "w") as f:
        f.write(os.environ["FIREBASE_CREDENTIALS_JSON"])

app = FastAPI()

cred = credentials.Certificate(firebase_json_path)
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://health12x-default-rtdb.firebaseio.com/"
})


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (use cautiously)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Option 1: Using context manager
def get_heart_rate_data():
    reader = HeartRateReader(serial_port='COM10')
    reader.connect()  # Establish the connection
    try:
        data = reader.read_data()
        if data:
           return data
            # print(f"Heart Rate Data: {data}")
    except KeyboardInterrupt:
        pass

# Dummy data for demonstration purposes
doctors_db = {}
appointments_db = {}
users_db = {}
symptom_history = {}
prescriptions_db = {}
notifications_db = {}

# Firebase references
prescriptions_ref = db.reference("prescriptions")
appointments_ref = db.reference("Appointments")
users_ref = db.reference("users")
symptom_history_ref = db.reference("symptom_history")


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
    # heart_rate: str

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
    availability: List[str]  # List of available times/days

# Add this to your existing models
# class PrescriptionCreate(BaseModel):
#     appointment_id: str
#     prescription_details: str
#     doctor_notes: Optional[str]

class PrescriptionCreate(BaseModel):
    appointment_id: str
    medicine_name: str
    frequency: str
    dose: str
    duration: str
    instructions: str

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


# @app.post("/prescriptions/submit")
# async def submit_prescription(prescription: PrescriptionCreate):
#     """
#     Saves prescription data to Firebase Realtime Database.
#     """
#     try:
#         prescription_id = prescriptions_ref.push().key
#         prescription_data = {
#             "prescription_id": prescription_id,
#             "appointment_id": prescription.appointment_id,
#             "prescription_details": prescription.prescription_details,
#             "doctor_notes": prescription.doctor_notes,
#             "created_at": {time.time()},  # In production, use actual datetime",
#             "status": "prescribed"
#         }
#         prescriptions_ref.child(prescription_id).set(prescription_data)

#         # Update appointment status
#         appointment = appointments_ref.child(prescription.appointment_id).get()
#         if appointment:
#             appointments_ref.child(prescription.appointment_id).update({"status": "Prescribed"})

#         return {
#             "message": "Prescription submitted successfully",
#             "prescription_id": prescription_id,
#             "prescription_data": prescription_data
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

def get_time():
    current_time = time.localtime()
    formatted_time = time.strftime("%Y-%m-%d %H:%M:%S", current_time)
    return formatted_time

# @app.post("/prescriptions/submit")
# async def submit_prescription(prescription: PrescriptionCreate):
#     """
#     Saves prescription data to Firebase Realtime Database.
#     """
#     try:
#         prescription_id = prescriptions_ref.push().key
#         prescription_data = {
#             "prescription_id": prescription_id,
#             "appointment_id": prescription.appointment_id,
#             "medicine_name": prescription.medicine_name,
#             "dose": prescription.dose,
#             "frequency": prescription.frequency,
#             "duration": prescription.duration,
#             "instructions": prescription.instructions,
#             "url": upload_to_google_drive("./prescription.pdf"),
#             "created_at": f"{get_time()}",  # In production, use actual datetime",
#             "status": "prescribed"
#         }
#         prescriptions_ref.child(prescription_id).set(prescription_data)
#         last_prescription = fetch_last_prescription()
#         create_prescription_pdf(last_prescription, "Screenshot 2024-11-18 171703.png", "prescription.pdf", "Vishnukant Clinic")

#         # Update appointment status
#         appointment = appointments_ref.child(prescription.appointment_id).get()
#         if appointment:
#             appointments_ref.child(prescription.appointment_id).update({"status": "Prescribed"})

#         return {
#             "message": "Prescription submitted successfully",
#             "prescription_id": prescription_id,
#             "prescription_data": prescription_data
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

@app.get('/')
async def root():
    return {"response":"Welcome to Medisphere"}

@app.get("/api/test")
def test():
    return {"msg": "Hello from backend"}

@app.post("/prescriptions/submit")
async def submit_prescription(prescription: PrescriptionCreate):
    """
    Saves prescription data to Firebase Realtime Database and uploads the corresponding PDF to Google Drive.
    """
    try:
        # Generate a unique ID for the prescription
        prescription_id = prescriptions_ref.push().key
        
        # Prepare prescription data
        prescription_data = {
            "prescription_id": prescription_id,
            "appointment_id": prescription.appointment_id,
            "medicine_name": prescription.medicine_name,
            "dose": prescription.dose,
            "frequency": prescription.frequency,
            "duration": prescription.duration,
            "instructions": prescription.instructions,
            "created_at": f"{get_time()}",
            "status": "prescribed"
        }

        # Save the prescription data to Firebase (without the URL yet)
        prescriptions_ref.child(prescription_id).set(prescription_data)

        # Create the prescription PDF for this specific prescription
        pdf_filename = f"prescription_{prescription_id}.pdf"
        create_prescription_pdf(prescription_data, "Screenshot 2024-11-18 171703.png", pdf_filename, "Vishnukant Clinic")

        # Upload the PDF to Google Drive
        pdf_url = upload_to_google_drive(pdf_filename)

        # Update the prescription data with the URL in Firebase
        prescriptions_ref.child(prescription_id).update({"url": pdf_url})

        # Update the appointment status in Firebase
        appointment = appointments_ref.child(prescription.appointment_id).get()
        if appointment:
            appointments_ref.child(prescription.appointment_id).update({"status": "Prescribed"})

        # Return a success response
        return {
            "message": "Prescription submitted successfully",
            "prescription_id": prescription_id,
            "prescription_data": {
                **prescription_data,
                "url": pdf_url
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/prescriptions")
async def get_all_prescriptions(authenticated: bool = Depends(authenticate)):
    """
    Retrieves all prescriptions from Firebase Realtime Database.
    """
    try:
        prescriptions = prescriptions_ref.get()
        return {
            "total_prescriptions": len(prescriptions) if prescriptions else 0,
            "prescriptions": prescriptions or []
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Endpoint to Book an Appointment
@app.get("/test/symptoms")
async def get_all_appointments():
    """
    Fetch all booked appointments from Firebase Realtime Database.
    """
    try:
        # Reference the 'appointments' node in the Firebase Realtime Database
        ref = db.reference("Appointments")
        appointments = ref.get()  # Fetch all appointments data
        
        if not appointments:
            return {"message": "No appointments found", "total_appointments": 0, "appointments": []}
        
        # Convert the dictionary to a list of appointments
        appointment_list = [
            {
                "appointment_id": key,
                **value
            }
            for key, value in appointments.items()
        ]
        
        return {
            "total_appointments": len(appointment_list),
            "appointments": appointment_list
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching appointments: {str(e)}")
        
    
    
@app.post("/submit-symptoms")
async def receive_symptoms(patient_id: str, symptoms: List[str], authenticated: bool = Depends(authenticate)):
    """
    Saves symptoms to Firebase Realtime Database.
    """
    heart_data=get_heart_rate_data()
    curr_time=time.time()
    try:
        symptom_id = symptom_history_ref.child(patient_id).push().key
        symptom_data = {
            "symptom_id": symptom_id,
            "symptoms": symptoms,
            "timestamp": curr_time,
            "heart_info": f"{heart_data}",
            "status": "Processing"
        }
        symptom_history_ref.child(curr_time*1.3).child(symptom_id).set(symptom_data)

        return {
            "symptom_id": symptom_id,
            "message": f"Symptoms for patient {patient_id} received.",
            "symptom_data": symptom_data,
            "time":curr_time,
            "heart_info":f"{heart_data}",
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

# Submit symptoms endpoint
# @app.post("/submit-symptoms")
# async def receive_symptoms(request: SymptomRequest, authenticated: bool = Depends(authenticate)):
#     heart_data=get_heart_rate_data()
#     if request.patient_id not in symptom_history:
#         symptom_history[request.patient_id] = []
#     symptom_id = len(symptom_history[request.patient_id]) + 1
#     symptom_entry = {
#         "submission_id": str(symptom_id),
#         "symptoms": request.symptoms,
#         "timestamp": time.time(),  
#         "heart_rate": f"{heart_data}",
#         "status": "Processing"
#     }
#     symptom_history[request.patient_id].append(symptom_entry)
#     return {"message": f"Symptoms for patient {request.patient_id} received.", "received_symptoms": request.symptoms,"heart_info":f"{heart_data}", "status": "Processing"}

# @app.post("/appointments/book")
# async def book_appointment(appointment: AppointmentRequest):
#     if appointment.doctor_id not in doctors_db:
#         raise HTTPException(status_code=404, detail="Doctor not found.")
#     appointment_id = str(len(appointments_db) + 1)
#     appointments_db[appointment_id] = {
#         "appointment_id": appointment_id,
#         "patient_id": appointment.patient_id,
#         "doctor_id": appointment.doctor_id,
#         "date_time": appointment.date_time,
#         "notes": appointment.notes,
#         "status": "Booked"
#     }
#     return {"message": "Appointment booked successfully", "appointment_id": appointment_id}

# Endpoint to fetch appointments for a specific doctor
# @app.get("/appointments/{doctor_id}")
# async def get_doctor_appointments(doctor_id: str, authenticated: bool = Depends(authenticate)):
#     doctor_appointments = [
#         {
#             "appointment_id": a["appointment_id"],
#             "patient_id": a["patient_id"],
#             "symptoms": a["symptoms"],
#             "status": a["status"]
#         }
#         for a in appointments_db.values() if a["doctor_id"] == doctor_id
#     ]
#     return {"doctor_id": doctor_id, "appointments": doctor_appointments}


# @app.post("/prescriptions/submit")
# async def submit_prescription(prescription: PrescriptionCreate):
#     """
#     Allows submission of a prescription with updated fields.
#     """
#     try:
#         # Create prescription entry
#         prescription_id = str(len(prescriptions_db) + 1)
#         prescription_data = {
#             "prescription_id": prescription_id,
#             "submission_id": prescription.appointment_id,  # Using appointment_id as submission_id
#             "prescription_details": prescription.prescription_details,
#             "doctor_notes": prescription.doctor_notes,
#             "created_at": "2024-11-16",  # In production, use actual datetime
#             "status": "prescribed"  # Adding status field
#         }
        
#         prescriptions_db[prescription_id] = prescription_data
        
#         # Update appointment status if it exists
#         if prescription.appointment_id in appointments_db:
#             appointments_db[prescription.appointment_id]["status"] = "prescribed"
        
#         return {
#             "status": "success",
#             "message": "Prescription submitted successfully",
#             "prescription_id": prescription_id,
#             "prescription_data": prescription_data
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))


# @app.get("/prescriptions")
# async def get_all_prescriptions(authenticated: bool = Depends(authenticate)):
#     """
#     Fetches all the submitted prescriptions in the system.
#     """
#     return {
#         "total_prescriptions": len(prescriptions_db),
#         "prescriptions": list(prescriptions_db.values())
#     }
# Get symptom history endpoint
# @app.get("/symptoms/history/{user_id}")
# async def get_symptom_history(user_id: str, authenticated: bool = Depends(authenticate)):
#     if user_id not in symptom_history:
#         return {"user_id": user_id, "history": []}
#     return {"user_id": user_id, "history": symptom_history[user_id]}
# # Register endpoint
# @app.post("/register")
# async def register_user(user: UserRegisterRequest):
#     if user.email in users_db:
#         raise HTTPException(status_code=400, detail="Email already registered.")
#     user_id = str(len(users_db) + 1)
#     users_db[user_id] = {
#         "user_id": user_id,
#         "name": user.name,
#         "email": user.email,
#         "password": user.password,  # Don't store passwords like this; hash them!
#         "age": user.age,
#         "gender": user.gender
#     }
#     return {"message": "User registered successfully", "user_id": user_id}


# Login endpoint
# @app.post("/login")
# async def login_user(login: UserLoginRequest):
#     for user_id, user_data in users_db.items():
#         if login.email == user_data["email"] and login.password == user_data["password"]:
#             return {"message": "Login successful", "token": MOCK_TOKEN}
#     raise HTTPException(status_code=401, detail="Invalid credentials")

# Logout endpoint
# @app.post("/logout")
# async def logout_user(authenticated: bool = Depends(authenticate)):
#     return {"message": "User logged out successfully"}

# Get user profile endpoint
# @app.get("/user/{user_id}")
# async def get_user_profile(user_id: str, authenticated: bool = Depends(authenticate)):
#     if user_id not in users_db:
#         raise HTTPException(status_code=404, detail="User not found.")
#     return users_db[user_id]

# Update user profile endpoint
# @app.put("/user/{user_id}")
# async def update_user_profile(user_id: str, update: UserProfileUpdateRequest, authenticated: bool = Depends(authenticate)):
#     if user_id not in users_db:
#         raise HTTPException(status_code=404, detail="User not found.")
#     user_data = users_db[user_id]
#     if update.name:
#         user_data["name"] = update.name
#     if update.age:
#         user_data["age"] = update.age
#     return {"message": "User profile updated successfully"}

# Endpoint to Retrieve Doctors by Specialization
# @app.get("/doctors/speciality/{speciality}")
# async def get_doctors_by_speciality(speciality: Specialization):
#     doctors_list = [doc for doc in doctors_db.values() if doc["speciality"] == speciality]
#     if not doctors_list:
#         raise HTTPException(status_code=404, detail="No doctors found for this speciality.")
#     return {"speciality": speciality, "doctors": doctors_list}


# # Endpoint to Retrieve Appointments for a Doctor
# @app.get("/doctors/{doctor_id}/appointments")
# async def get_doctor_appointments(doctor_id: str):
#     if doctor_id not in doctors_db:
#         raise HTTPException(status_code=404, detail="Doctor not found.")
#     doctor_appointments = [appt for appt in appointments_db.values() if appt["doctor_id"] == doctor_id]
#     return {"doctor_id": doctor_id, "appointments": doctor_appointments}

# Endpoint to Cancel an Appointment
# @app.delete("/appointments/{appointment_id}/cancel")
# async def cancel_appointment(appointment_id: str):
#     if appointment_id not in appointments_db:
#         raise HTTPException(status_code=404, detail="Appointment not found.")
#     appointments_db.pop(appointment_id)
#     return {"message": "Appointment canceled successfully", "appointment_id": appointment_id}

# Get notifications endpoint
# @app.get("/notifications/{user_id}")
# async def get_notifications(user_id: str, authenticated: bool = Depends(authenticate)):
#     user_notifications = notifications_db.get(user_id, [])
#     return {"notifications": user_notifications}

# Submit feedback endpoint
# @app.post("/feedback")
# async def submit_feedback(feedback: FeedbackRequest, authenticated: bool = Depends(authenticate)):
#     # Here, you might want to store feedback in a database or process it further
#     return {"message": "Feedback submitted. Thank you for your input."}


# Test route to fetch all submitted symptoms for testing purposes
# @app.get("/test/symptoms")
# async def get_all_symptoms(authenticated: bool = Depends(authenticate)):
#     all_symptoms = []
#     for patient_id, entries in symptom_history.items():
#         for entry in entries:
#             all_symptoms.append({
#                 "patient_id": patient_id,
#                 "submission_id": entry["submission_id"],
#                 "symptoms": entry["symptoms"],
#                 "status": entry["status"],
#                 "timestamp": entry["timestamp"],
#                 "heart_rate": entry["heart_rate"]
#             })
#     return {"total_symptoms_submissions": len(all_symptoms), "submissions": all_symptoms}

    
# @app.post("/appointments/{appointment_id}/prescription")
# async def create_prescription(
#     appointment_id: str,
#     prescription: PrescriptionCreate,
#     authenticated: bool = Depends(authenticate)
# ):
#     # Check if appointment exists
#     if appointment_id not in appointments_db:
#         raise HTTPException(status_code=404, detail="Appointment not found")
    
#     # Create prescription entry
#     prescription_id = str(len(prescriptions_db) + 1)
#     prescription_data = {
#         "prescription_id": prescription_id,
#         "appointment_id": appointment_id,
#         "prescription_details": prescription.prescription_details,
#         "doctor_notes": prescription.doctor_notes,
#         "doctor_id": appointments_db[appointment_id]["doctor_id"],
#         "patient_id": appointments_db[appointment_id]["patient_id"],
#         "created_at": "2024-11-16"  # In production, use actual datetime
#     }
    
#     prescriptions_db[prescription_id] = prescription_data
    
#     # Update appointment status
#     appointments_db[appointment_id]["status"] = "Prescribed"
    
#     # Create notification for patient
#     patient_id = appointments_db[appointment_id]["patient_id"]
#     if patient_id not in notifications_db:
#         notifications_db[patient_id] = []
    
#     notifications_db[patient_id].append({
#         "notification_id": str(len(notifications_db.get(patient_id, [])) + 1),
#         "message": "New prescription available for your appointment",
#         "type": "prescription",
#         "appointment_id": appointment_id,
#         "read": False
#     })
    
#     return {
#         "message": "Prescription created successfully",
#         "prescription_id": prescription_id,
#         "prescription_data": prescription_data
#     }


# @app.get("/appointments/{appointment_id}/prescription")
# async def get_prescription(
#     appointment_id: str,
#     authenticated: bool = Depends(authenticate)
# ):
#     # Find prescription for the appointment
#     prescription = next(
#         (p for p in prescriptions_db.values() if p["appointment_id"] == appointment_id),
#         None
#     )
    
#     if not prescription:
#         raise HTTPException(
#             status_code=404,
#             detail="No prescription found for this appointment"
#         )
    
#     return prescription


# @app.get("/prescriptions/patient/{patient_id}")
# async def get_patient_prescriptions(
#     patient_id: str,
#     authenticated: bool = Depends(authenticate)
# ):
#     patient_prescriptions = [
#         p for p in prescriptions_db.values()
#         if p["patient_id"] == patient_id
#     ]
    
#     return {
#         "patient_id": patient_id,
#         "prescriptions": patient_prescriptions
#     }


# @app.put("/appointments/{appointment_id}/prescription/{prescription_id}")
# async def update_prescription(
#     appointment_id: str,
#     prescription_id: str,
#     prescription: PrescriptionCreate,
#     authenticated: bool = Depends(authenticate)
# ):
#     # Check if prescription exists
#     if prescription_id not in prescriptions_db:
#         raise HTTPException(status_code=404, detail="Prescription not found")
    
#     # Check if prescription belongs to the appointment
#     if prescriptions_db[prescription_id]["appointment_id"] != appointment_id:
#         raise HTTPException(
#             status_code=400,
#             detail="Prescription does not belong to this appointment"
#         )
    
#     # Update prescription
#     prescriptions_db[prescription_id].update({
#         "prescription_details": prescription.prescription_details,
#         "doctor_notes": prescription.doctor_notes
#     })
    
#     return {
#         "message": "Prescription updated successfully",
#         "prescription_data": prescriptions_db[prescription_id]
#     }