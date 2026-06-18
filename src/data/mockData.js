export const appointments = [
  {
    id: 'apt-1',
    doctorId: 'dr-sophia-kinsley',
    doctorName: 'Dr. Sophia Kinsley',
    specialty: 'Cardiology Specialist',
    date: '2026-06-25',
    time: '14:30',
    type: 'In-Person',
    status: 'Upcoming'
  },
  {
    id: 'apt-2',
    doctorId: 'dr-marcus-chen',
    doctorName: 'Dr. Marcus Chen',
    specialty: 'Neurology',
    date: '2026-05-12',
    time: '10:00',
    type: 'Video Consult',
    status: 'Completed'
  }
];

export const healthRecords = [
  {
    id: 'rec-1',
    date: '2026-05-12',
    title: 'Neurological Assessment',
    type: 'Diagnosis',
    doctor: 'Dr. Marcus Chen',
    description: 'Routine follow-up for chronic migraines. Prescribed new preventative medication. Next checkup in 6 months.',
    files: ['assessment_report.pdf', 'mri_scan.jpg']
  },
  {
    id: 'rec-2',
    date: '2026-03-22',
    title: 'Complete Blood Count (CBC)',
    type: 'Lab Test',
    doctor: 'DOCCARE Labs',
    description: 'All values within normal range. Vitamin D slightly low, recommended supplements.',
    files: ['lab_results_mar_26.pdf']
  },
  {
    id: 'rec-3',
    date: '2025-11-15',
    title: 'Annual Cardiac Screening',
    type: 'Diagnosis',
    doctor: 'Dr. Sophia Kinsley',
    description: 'ECG and Stress test normal. BP slightly elevated (128/82). Recommended lifestyle modifications.',
    files: ['ecg_report.pdf']
  },
  {
    id: 'rec-4',
    date: '2025-08-01',
    title: 'COVID-19 Booster',
    type: 'Vaccination',
    doctor: 'DOCCARE Clinic',
    description: 'Administered mRNA booster dose. No adverse reactions observed.',
    files: ['vaccination_record.pdf']
  }
];

export const metrics = {
  bloodPressure: '120/80',
  heartRate: '72 bpm',
  weight: '75 kg',
  height: '180 cm',
  bmi: '23.1'
};
