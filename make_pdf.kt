import com.itextpdf.io.image.ImageDataFactory
import com.itextpdf.kernel.colors.ColorConstants
import com.itextpdf.kernel.pdf.PdfDocument
import com.itextpdf.kernel.pdf.PdfWriter
import com.itextpdf.layout.Document
import com.itextpdf.layout.element.Image
import com.itextpdf.layout.element.Paragraph
import com.itextpdf.layout.element.Table
import com.itextpdf.layout.property.UnitValue

fun createPrescriptionPdf(
    data: Map<String, String>,
    logoPath: String?,
    filename: String,
    clinicName: String
) {
    // Create a PdfWriter and PdfDocument
    val pdfWriter = PdfWriter(filename)
    val pdfDocument = PdfDocument(pdfWriter)
    val document = Document(pdfDocument)

    // Add a logo image at the top
    logoPath?.let {
        val imageData = ImageDataFactory.create(it)
        val image = Image(imageData).setWidth(UnitValue.createPercentValue(100f)).setHeight(120f)
        document.add(image)
    }

    // Add the clinic name
    document.add(
        Paragraph(clinicName)
            .setFontSize(14f)
            .setBold()
    )

    // Add a separator line
    val separator = Paragraph(" ")
        .setMarginTop(-10f)
        .setMarginBottom(10f)
        .setBorderBottom(BorderStroke(ColorConstants.BLACK, 1f))
    document.add(separator)

    // Create a table for patient details
    val tableData = Table(UnitValue.createPercentArray(2)).useAllAvailableWidth()
    data.forEach { (key, value) ->
        tableData.addCell(Paragraph(key).setBold())
        tableData.addCell(Paragraph(value))
    }
    document.add(tableData)

    // Add a section for medicines
    val medicineData = mapOf(
        "Medication" to "Paracetamol 500mg - Twice a day",
        "Notes" to "Take after meals. Hydrate well."
    )

    document.add(Paragraph("Prescribed Medicines").setBold().setFontSize(12f).setMarginTop(10f))

    val medicineTable = Table(UnitValue.createPercentArray(2)).useAllAvailableWidth()
    medicineTable.addHeaderCell(Paragraph("Medicine Name").setBold())
    medicineTable.addHeaderCell(Paragraph("Instructions").setBold())
    medicineData.forEach { (key, value) ->
        medicineTable.addCell(Paragraph(key))
        medicineTable.addCell(Paragraph(value))
    }
    document.add(medicineTable)

    // Add a footer image if available
    logoPath?.let {
        val footerImageData = ImageDataFactory.create(it)
        val footerImage = Image(footerImageData).setWidth(UnitValue.createPercentValue(100f)).setHeight(100f)
        document.add(footerImage)
    }

    // Close the document
    document.close()
}

// Example data for the prescription
val data = mapOf(
    "Patient Name" to "Jane Doe",
    "Age" to "45",
    "Prescription Date" to "2024-11-16"
)

// Path to the logo image file
val logoPath = "Screenshot_2024_11_18_171703.png"

// Clinic name
val clinicName = "Vishnukant Clinic"

// Generate the PDF
createPrescriptionPdf(data, logoPath, "prescription.pdf", clinicName)