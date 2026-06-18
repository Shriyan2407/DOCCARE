import React, { createContext, useState, useEffect } from 'react';
import { doctorsData } from '../data/doctorsData';

export const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  // Load initial state from LocalStorage or use defaults
  const loadState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [doctors] = useState(doctorsData); // Static list of doctors
  const [appointments, setAppointments] = useState(() => loadState('appointments', []));
  const [medicalRecords, setMedicalRecords] = useState(() => loadState('medicalRecords', []));
  const [profile, setProfile] = useState(() => loadState('patientProfile', {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City, Country',
    bloodGroup: 'O+'
  }));

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
  }, [medicalRecords]);

  useEffect(() => {
    localStorage.setItem('patientProfile', JSON.stringify(profile));
  }, [profile]);

  // Actions
  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, id: Date.now(), status: 'Upcoming' }]);
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'Cancelled' } : app
    ));
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, ...updatedData } : app
    ));
  };

  const addMedicalRecord = (record) => {
    setMedicalRecords([...medicalRecords, { ...record, id: Date.now() }]);
  };

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <HospitalContext.Provider value={{
      doctors,
      appointments,
      medicalRecords,
      profile,
      addAppointment,
      cancelAppointment,
      updateAppointment,
      addMedicalRecord,
      updateProfile
    }}>
      {children}
    </HospitalContext.Provider>
  );
};
