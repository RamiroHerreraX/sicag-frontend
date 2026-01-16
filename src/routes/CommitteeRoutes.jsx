// src/routes/CommitteeRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommitteeDashboard from '../pages/committee/CommitteeDashboard';
import CertificationReview from '../pages/committee/CertificationReview';
import DocumentReview from '../pages/committee/DocumentReview';
import CommitteeAlerts from '../pages/committee/CommitteeAlerts';
import CommitteeProfile from '../pages/committee/CommitteeProfile';

const CommitteeRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<CommitteeDashboard />} />
      <Route path="review" element={<CommitteeDashboard />} /> {/* Lista de revisiones */}
      <Route path="review/:id" element={<CertificationReview />} /> {/* Revisión específica */}
      <Route path="document/:certId/:docId" element={<DocumentReview />} />
      <Route path="alerts" element={<CommitteeAlerts />} />
      <Route path="profile" element={<CommitteeProfile />} />
    </Routes>
  );
};

export default CommitteeRoutes;