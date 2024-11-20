import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#6b21a8',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#6b21a8',
    marginBottom: 5,
  },
  clinicInfo: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6b21a8',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontSize: 10,
    color: '#666',
  },
  value: {
    fontSize: 10,
    flex: 1,
  },
  prescriptionDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#6b21a8',
    paddingTop: 10,
  },
});

const PrescriptionPDF = ({ prescription }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Prescription</Text>
        <Text style={styles.clinicInfo}>Health Care Clinic</Text>
        <Text style={styles.clinicInfo}>123 Medical Drive, Healthcare City</Text>
        <Text style={styles.clinicInfo}>Phone: (123) 456-7890</Text>
      </View>

      {/* Patient Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>32 years</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>Male</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{prescription.created_at}</Text>
        </View>
      </View>

      {/* Prescription Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prescription</Text>
        <View style={styles.prescriptionDetails}>
          <Text style={styles.value}>{prescription.prescription_details}</Text>
        </View>
      </View>

      {/* Doctor's Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Doctor's Notes</Text>
        <Text style={styles.value}>{prescription.doctor_notes}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.value}>Doctor's Signature</Text>
        <Text style={styles.clinicInfo}>Prescription ID: {prescription.prescription_id}</Text>
      </View>
    </Page>
  </Document>
);

export default PrescriptionPDF;