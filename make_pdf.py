# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from reportlab.lib import colors
# from reportlab.lib.utils import ImageReader

# def create_prescription_pdf(data, logo_path, filename, clinic_name):
#     # Create a canvas and set the page size
#     c = canvas.Canvas(filename, pagesize=letter)
#     width, height = letter

#     # Add an authorized logo to the top-left corner
#     if logo_path:
#         c.drawImage(ImageReader(logo_path), 50, height - 80, width=100, height=50, mask='auto')

#     # Add the clinic name to the top right
#     c.setFont("Helvetica-Bold", 14)
#     clinic_name_width = c.stringWidth(clinic_name, "Helvetica-Bold", 14)
#     c.drawString(width - clinic_name_width - 50, height - 50, clinic_name)

#     # Set the title
#     c.setFont("Helvetica-Bold", 16)
#     c.drawString(160, height - 50, "Prescription")

#     # Draw a separator line
#     c.setStrokeColor(colors.black)
#     c.line(50, height - 90, width - 50, height - 90)

#     # Dynamic data section
#     y_position = height - 120
#     c.setFont("Helvetica", 12)

#     for key, value in data.items():
#         c.drawString(50, y_position, f"{key}: {value}")
#         y_position -= 20  # Move down for the next line

#         # Create a new page if needed
#         if y_position < 50:
#             c.showPage()
#             c.setFont("Helvetica", 12)
#             y_position = height - 50

#     # Save the PDF
#     c.save()

# # Example data for the prescription
# data = {
#     "Patient Name": "Jane Doe",
#     "Age": "45",
#     "Prescription Date": "2024-11-16",
#     "Medication": "Paracetamol 500mg - Twice a day",
#     "Notes": "Take after meals. Hydrate well.",
# }

# # Path to the logo image file (replace with your logo path)
# logo_path = "_d847e09d-97ab-4fbb-9af6-0fb6332ea9a7.png"

# # Clinic name
# clinic_name = "HealthCare Clinic"

# # Generate the PDF
# create_prescription_pdf(data, logo_path, "prescription.pdf", clinic_name)




# Updated code with the uploaded image path
# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from reportlab.lib import colors
# from reportlab.lib.utils import ImageReader

# def create_prescription_pdf(data, logo_path, filename, clinic_name):
#     # Create a canvas and set the page size
#     c = canvas.Canvas(filename, pagesize=letter)
#     width, height = letter

#     # Add an authorized logo to the top-left corner
#     if logo_path:
#         c.drawImage(ImageReader(logo_path), 50, height - 80, width=100, height=50, mask='auto')

#     # Add the clinic name to the top right
#     c.setFont("Helvetica-Bold", 14)
#     clinic_name_width = c.stringWidth(clinic_name, "Helvetica-Bold", 14)
#     c.drawString(width - clinic_name_width - 50, height - 50, clinic_name)

#     # Set the title
#     c.setFont("Helvetica-Bold", 16)
#     c.drawString(160, height - 50, "Prescription")

#     # Draw a separator line
#     c.setStrokeColor(colors.black)
#     c.line(50, height - 90, width - 50, height - 90)

#     # Dynamic data section
#     y_position = height - 120
#     c.setFont("Helvetica", 12)

#     for key, value in data.items():
#         c.drawString(50, y_position, f"{key}: {value}")
#         y_position -= 20  # Move down for the next line

#         # Create a new page if needed
#         if y_position < 50:
#             c.showPage()
#             c.setFont("Helvetica", 12)
#             y_position = height - 50

#     # Save the PDF
#     c.save()

# # Example data for the prescription
# data = {
#     "Patient Name": "Jane Doe",
#     "Age": "45",
#     "Prescription Date": "2024-11-16",
#     "Medication": "Paracetamol 500mg - Twice a day",
#     "Notes": "Take after meals. Hydrate well.",
# }

# # Path to the uploaded logo image file
# logo_path = "Screenshot 2024-11-18 171703.png"

# # Clinic name
# clinic_name = "Vishnukant Clinic"

# # Generate the PDF
# create_prescription_pdf(data, logo_path, "prescription.pdf", clinic_name)


# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from reportlab.lib import colors
# from reportlab.lib.utils import ImageReader

# def create_prescription_pdf(data, logo_path, filename, clinic_name):
#     # Create a canvas and set the page size
#     c = canvas.Canvas(filename, pagesize=letter)
#     width, height = letter

#     # Add an image covering the entire header section
#     if logo_path:
#         c.drawImage(ImageReader(logo_path), 0, height - 120, width=width, height=100, mask='auto')

#     # Add the clinic name below the header image
#     c.setFont("Helvetica-Bold", 14)
#     c.drawString(50, height - 140, clinic_name)

#     # # Set the title for the prescription
#     # c.setFont("Helvetica-Bold", 16)
#     # c.drawString(160, height - 140, "Prescription")

#     # Draw a separator line below the header
#     c.setStrokeColor(colors.black)
#     c.line(50, height - 160, width - 50, height - 160)

#     # Dynamic data section
#     y_position = height - 180
#     c.setFont("Helvetica", 12)

#     for key, value in data.items():
#         c.drawString(50, y_position, f"{key}: {value}")
#         y_position -= 20  # Move down for the next line

#         # Create a new page if needed
#         if y_position < 50:
#             c.showPage()
#             c.setFont("Helvetica", 12)
#             y_position = height - 50

#     # Save the PDF
#     c.save()

# # Example data for the prescription
# data = {
#     "Patient Name": "Jane Doe",
#     "Age": "45",
#     "Prescription Date": "2024-11-16",
#     "Medication": "Paracetamol 500mg - Twice a day",
#     "Notes": "Take after meals. Hydrate well.",
# }

# # Path to the uploaded logo image file (change as needed)
# logo_path = "Screenshot 2024-11-18 171703.png"

# # Clinic name
# clinic_name = "Vishnukant Clinic"

# # Generate the PDF
# create_prescription_pdf(data, logo_path, "prescription.pdf", clinic_name)



from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Table, TableStyle,SimpleDocTemplate
from reportlab.lib import colors

def create_prescription_pdf(data, logo_path, filename, clinic_name):
    # Create a canvas and set the page size
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Add an image covering the entire header section
    if logo_path:
        c.drawImage(ImageReader(logo_path), 0, height - 120, width=width, height=120, mask='auto')

    # Add the clinic name below the header image
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 140, clinic_name)

    # Draw a separator line below the header
    c.setStrokeColor(colors.black)
    c.line(50, height - 160, width - 50, height - 160)

    # Dynamic data section (Tabular Form)
    c.setFont("Helvetica", 12)
    y_position = height - 180  # Starting Y position for table

    # Prepare data in table format
    table_data =[[key, value] for key, value in data.items()]

    # Create table
    table = Table(table_data, colWidths=[150, 300])
    table.setStyle(TableStyle([
        # ('BACKGROUND', (0, 0), (-1, 0), colors.white),
        # ('TEXTCOLOR', (0, 0), (-1, 0), colors.red),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))

    # Draw the table on the canvas
    table.wrapOn(c, width, height)
    table.drawOn(c, 50, y_position - len(data) * 20)

    medicine_data={
        "Medication": "Paracetamol 500mg - Twice a day",
        "Notes": "Take after meals. Hydrate well.",
    }

    y_position = height - 290

    # Prepare data in table format
    table_data = [["Medicine Name", "Instructions"]] + [[key, value] for key, value in medicine_data.items()]

    # Create table
    table = Table(table_data, colWidths=[150, 300])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.white),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.red),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))

    # Draw the table on the canvas
    table.wrapOn(c, width, height)
    table.drawOn(c, 50, y_position - len(data) * 20)

    logo_path="Screenshot 2024-11-18 173051.png"
    # Add a footer image
    if logo_path:
        c.drawImage(ImageReader(logo_path), 0, 0, width=width, height=100, mask='auto')

    # Save the PDF
    c.save()

# Example data for the prescription
data = {
    "Patient Name": "Jane Doe",
    "Age": "45",
    "Prescription Date": "2024-11-16",
}

# Path to the uploaded logo image file
logo_path = "Screenshot 2024-11-18 171703.png"

# Clinic name
clinic_name = "Vishnukant Clinic"

# Generate the PDF
create_prescription_pdf(data, logo_path, "prescription.pdf", clinic_name)