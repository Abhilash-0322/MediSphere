// import React, { useState, useEffect } from 'react';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import { Download, Printer, ChevronLeft, ChevronRight } from 'lucide-react';

// const PrescriptionViewer = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const prescriptionsPerPage = 5;

//   useEffect(() => {
//     fetchPrescriptions();
//   }, []);

//   const fetchPrescriptions = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/prescriptions', {
//         headers: {
//           'Authorization': 'Bearer sample-token'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch prescriptions');
//       }

//       const data = await response.json();
//       setPrescriptions(data.prescriptions);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-[400px]">
//       <div className="w-16 h-16 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="bg-red-50 p-4 rounded-lg">
//       <p className="text-red-600">Error: {error}</p>
//     </div>
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(prescriptions.length / prescriptionsPerPage);
//   const startIndex = (currentPage - 1) * prescriptionsPerPage;
//   const currentPrescriptions = prescriptions.slice(
//     startIndex,
//     startIndex + prescriptionsPerPage
//   );

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Prescriptions</h1>

//       <div className="grid gap-6">
//         {currentPrescriptions.map((prescription, index) => (
//           <PrescriptionCard key={index} prescription={prescription} />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-4 mt-8">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="p-2 rounded-full hover:bg-purple-50 disabled:opacity-50"
//           >
//             <ChevronLeft className="w-5 h-5 text-purple-600" />
//           </button>
          
//           <span className="text-gray-600">
//             Page {currentPage} of {totalPages}
//           </span>
          
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="p-2 rounded-full hover:bg-purple-50 disabled:opacity-50"
//           >
//             <ChevronRight className="w-5 h-5 text-purple-600" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const PrescriptionCard = ({ prescription }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       {/* Header */}
//       <div className="bg-purple-600 p-4 text-white">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Prescription #{prescription.prescription_id}</h2>
//           <div className="flex gap-3">
//             <button 
//               className="p-2 hover:bg-purple-500 rounded-full transition-colors"
//               title="Print Prescription"
//             >
//               <Printer className="w-5 h-5" />
//             </button>
//             <button 
//               className="p-2 hover:bg-purple-500 rounded-full transition-colors"
//               title="Download PDF"
//             >
//               <Download className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         {/* Patient Information */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Information</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-500">Name</p>
//               <p className="font-medium">John Doe</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Age</p>
//               <p className="font-medium">32 years</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Gender</p>
//               <p className="font-medium">Male</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Phone</p>
//               <p className="font-medium">+1 234-567-8900</p>
//             </div>
//           </div>
//         </div>

//         {/* Prescription Details */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">Prescription Details</h3>
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <pre className="whitespace-pre-wrap font-sans text-gray-700">
//               {prescription.prescription_details}
//             </pre>
//           </div>
//         </div>

//         {/* Doctor's Notes */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">Doctor's Notes</h3>
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-700">{prescription.doctor_notes}</p>
//           </div>
//         </div>

//         {/* Footer Information */}
//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <div className="flex justify-between text-sm text-gray-500">
//             <p>Prescribed on: {prescription.created_at}</p>
//             <p>Status: <span className="text-green-600 font-medium">{prescription.status}</span></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionViewer;



import React, { useState, useEffect } from 'react';
import { Download, Printer, ChevronLeft, ChevronRight } from 'lucide-react';

// Separate CSS styles
const styles = `
.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1.5rem;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
}

.prescription-grid {
  display: grid;
  gap: 1.5rem;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 4rem;
  height: 4rem;
  border: 4px solid #e9d5ff;
  border-top: 4px solid #9333ea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  background-color: #fef2f2;
  padding: 1rem;
  border-radius: 0.5rem;
}

.error-message {
  color: #dc2626;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-button {
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  background: none;
  cursor: pointer;
}

.pagination-button:hover {
  background-color: #f3e8ff;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #9333ea;
}

.pagination-text {
  color: #4b5563;
}

/* Prescription Card Styles */
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background-color: #9333ea;
  padding: 1rem;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prescription-number {
  font-size: 1.25rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.header-button {
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.header-button:hover {
  background-color: #7e22ce;
}

.card-body {
  padding: 1.5rem;
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.patient-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.patient-info-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.patient-info-value {
  font-weight: 500;
}

.details-container {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
}

.prescription-details {
  white-space: pre-wrap;
  font-family: system-ui, -apple-system, sans-serif;
  color: #374151;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

.status {
  color: #059669;
  font-weight: 500;
}
`;

const PrescriptionViewer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 5;

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/prescriptions', {
        headers: {
          'Authorization': 'Bearer sample-token'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prescriptions');
      }

      const data = await response.json();
      setPrescriptions(data.prescriptions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p className="error-message">Error: {error}</p>
    </div>
  );

  // Calculate pagination
  const totalPages = Math.ceil(prescriptions.length / prescriptionsPerPage);
  const startIndex = (currentPage - 1) * prescriptionsPerPage;
  const currentPrescriptions = prescriptions.slice(
    startIndex,
    startIndex + prescriptionsPerPage
  );

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <h1 className="title">Prescriptions</h1>

        <div className="prescription-grid">
          {currentPrescriptions.map((prescription, index) => (
            <PrescriptionCard key={index} prescription={prescription} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              <ChevronLeft />
            </button>
            
            <span className="pagination-text">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const PrescriptionCard = ({ prescription }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="header-content">
          <h2 className="prescription-number">Prescription #{prescription.prescription_id}</h2>
          <div className="header-actions">
            <button className="header-button" title="Print Prescription">
              <Printer />
            </button>
            <button className="header-button" title="Download PDF">
              <Download />
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="section">
          <h3 className="section-title">Patient Information</h3>
          <div className="patient-grid">
            <div>
              <p className="patient-info-label">Name</p>
              <p className="patient-info-value">John Doe</p>
            </div>
            <div>
              <p className="patient-info-label">Age</p>
              <p className="patient-info-value">32 years</p>
            </div>
            <div>
              <p className="patient-info-label">Gender</p>
              <p className="patient-info-value">Male</p>
            </div>
            <div>
              <p className="patient-info-label">Phone</p>
              <p className="patient-info-value">+1 234-567-8900</p>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Prescription Details</h3>
          <div className="details-container">
            <pre className="prescription-details">
              {prescription.prescription_details}
            </pre>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Doctor's Notes</h3>
          <div className="details-container">
            <p className="prescription-details">{prescription.doctor_notes}</p>
          </div>
        </div>

        <div className="card-footer">
          <p>Prescribed on: {prescription.created_at}</p>
          <p>Heart Info: {prescription.heart_rate}</p>
          <p>Status: <span className="status">{prescription.status}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionViewer;