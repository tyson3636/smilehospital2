export enum StaffRole {
  ADMIN = 'Admin',
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
  PHARMACIST = 'Pharmacist',
  LAB_TECH = 'Lab Technician',
  RECEPTIONIST = 'Receptionist',
  RADIOLOGIST = 'Radiologist',
  HR = 'HR',
  ICT = 'ICT',
  BILLING = 'Billing'
}

export enum ShiftType {
  MORNING = 'Morning',
  EVENING = 'Evening',
  NIGHT = 'Night'
}

export interface User {
  id: string;
  name: string;
  role: StaffRole;
  dept?: string;
  email: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  status: 'Active' | 'Under Maintenance';
  description: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  condition: string;
  status: 'Inpatient' | 'Outpatient' | 'Discharged';
  assignedDoctor?: string;
  room?: string;
  checkInDate: string;
}
