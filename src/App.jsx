import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <HospitalProvider>
      <Router>
        <AppRoutes />
      </Router>
    </HospitalProvider>
  );
}

export default App;
