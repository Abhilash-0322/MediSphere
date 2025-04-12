// import React, { useState, useEffect } from 'react';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// // Ensure pdfMake can access fonts
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const PrescriptionViewer = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPrescriptions();
//   }, []);

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await fetch('/prescriptions', {
//         method: 'GET',
//         headers: {
//           "Authorization":"Bearer sample-token",
//           // 'Content-Type': 'application/json',
//           // Add any authentication headers if required
//           // 'Authorization': `Bearer ${yourAuthToken}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch prescriptions');
//       }

//       const data = await response.json();
//       setPrescriptions(data.prescriptions || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const generatePDF = (prescription) => {
//     // Create a PDF document definition
//     const documentDefinition = {
//       content: [
//         { text: 'Prescription Details', style: 'header' },
//         { 
//           table: {
//             widths: ['*', '*'],
//             body: Object.entries(prescription).map(([key, value]) => [
//               { text: key.replace(/_/g, ' ').toUpperCase(), bold: true },
//               { text: String(value) }
//             ])
//           }
//         }
//       ],
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           margin: [0, 0, 0, 10]
//         }
//       }
//     };

//     // Generate and download the PDF
//     pdfMake.createPdf(documentDefinition).download(`prescription_${prescription.id}.pdf`);
//   };

//   if (loading) {
//     return <div>Loading prescriptions...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={{ 
//       fontFamily: 'Arial, sans-serif', 
//       maxWidth: '800px', 
//       margin: '0 auto', 
//       padding: '20px' 
//     }}>
//       <h1 style={{ 
//         color: '#333', 
//         borderBottom: '2px solid #ccc', 
//         paddingBottom: '10px' 
//       }}>
//         Prescriptions
//       </h1>

//       {prescriptions.length === 0 ? (
//         <p>No prescriptions found.</p>
//       ) : (
//         <table style={{ 
//           width: '100%', 
//           borderCollapse: 'collapse', 
//           marginTop: '20px' 
//         }}>
//           <thead>
//             <tr style={{ 
//               backgroundColor: '#f4f4f4', 
//               borderBottom: '1px solid #ddd' 
//             }}>
//               <th style={tableHeaderStyle}>Prescription Details</th>
//               <th style={tableHeaderStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescriptions.map((prescription, index) => (
//               <tr 
//                 key={prescription.id || index} 
//                 style={{ 
//                   borderBottom: '1px solid #eee',
//                   ':hover': { backgroundColor: '#f9f9f9' } 
//                 }}
//               >
//                 <td style={tableCellStyle}>
//                   {Object.entries(prescription).map(([key, value]) => (
//                     <div key={key}>
//                       <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {String(value)}
//                     </div>
//                   ))}
//                 </td>
//                 <td style={tableCellStyle}>
//                   <button 
//                     onClick={() => generatePDF(prescription)}
//                     style={buttonStyle}
//                   >
//                     Download PDF
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// // Styles
// const tableHeaderStyle = {
//   padding: '10px',
//   textAlign: 'left',
//   fontWeight: 'bold',
//   color: '#555'
// };

// const tableCellStyle = {
//   padding: '10px',
//   verticalAlign: 'top'
// };

// const buttonStyle = {
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   padding: '8px 16px',
//   textAlign: 'center',
//   textDecoration: 'none',
//   display: 'inline-block',
//   fontSize: '14px',
//   margin: '4px 2px',
//   cursor: 'pointer',
//   borderRadius: '4px'
// };

// export default PrescriptionViewer;


// import React from 'react';

// const PrescriptionViewer = ({ prescription }) => {
//   // Add default props or null checks
//   if (!prescription) {
//     return <div>No prescription data available</div>;
//   }

//   return (
//     <div className="prescription-viewer">
//       <h2>Prescription Details</h2>
//       <div>
//         <p><strong>Medicine Name:</strong> {prescription.medicine_name || 'N/A'}</p>
//         <p><strong>Dose:</strong> {prescription.dose || 'N/A'}</p>
//         <p><strong>Frequency:</strong> {prescription.frequency || 'N/A'}</p>
//         <p><strong>Duration:</strong> {prescription.duration || 'N/A'}</p>
//         <p><strong>Instructions:</strong> {prescription.instructions || 'N/A'}</p>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionViewer;



import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  // Table, 
  // TableBody, 
  // TableCell, 
  // TableContainer, 
  // TableHead, 
  // TableRow, 
  CircularProgress, 
  Box, 
  Chip,
  Grid
} from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import EventNoteIcon from '@mui/icons-material/EventNote';
import axios from 'axios';

const PrescriptionsList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/prescriptions', {
          headers: {
            'Authorization': `Bearer ${"sample-token"}`
          }
        });

        // Transform the object response into an array of prescriptions
        const prescriptionData = response.data.prescriptions;
        const prescriptionArray = Object.keys(prescriptionData)
          .filter(key => prescriptionData[key] && typeof prescriptionData[key] === 'object')
          .map(key => ({
            ...prescriptionData[key],
            firebase_id: key
          }));

        setPrescriptions(prescriptionArray);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const formatDate = (dateString) => {
    // Handle different date formats
    if (!dateString) return 'N/A';
    
    // If it looks like a timestamp
    if (dateString.includes('.')) {
      return new Date(parseFloat(dateString) * 1000).toLocaleDateString();
    }
    
    // For standard date strings
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, color: 'error.main' }}>
        Error: {error}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 3, 
          fontWeight: 600, 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <MedicationIcon sx={{ mr: 2, color: 'primary.main' }} />
        Prescriptions
        <Chip 
          label={prescriptions.length} 
          color="primary" 
          variant="outlined" 
          sx={{ ml: 2 }} 
        />
      </Typography>

      <Grid container spacing={3}>
        {prescriptions.map((prescription) => (
          <Grid item xs={12} md={6} lg={4} key={prescription.firebase_id}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <Typography variant="h6" gutterBottom>
                {prescription.medicine_name || 'Unnamed Medication'}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EventNoteIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2">
                  Prescribed: {formatDate(prescription.created_at)}
                </Typography>
              </Box>

              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Dose:</strong> {prescription.dose}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Duration:</strong> {prescription.duration} days
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Frequency:</strong> {prescription.frequency}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Status:</strong>{' '}
                    <Chip 
                      label={prescription.status} 
                      color={prescription.status === 'prescribed' ? 'success' : 'default'}
                      size="small"
                    />
                  </Typography>
                </Grid>
              </Grid>

              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 2, 
                  fontStyle: 'italic', 
                  color: 'text.secondary' 
                }}
              >
                Instructions: {prescription.instructions || 'No specific instructions'}
              </Typography>

              {prescription.appointment_id && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 1, 
                    color: 'text.disabled' 
                  }}
                >
                  Appointment ID: {prescription.appointment_id}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PrescriptionsList;