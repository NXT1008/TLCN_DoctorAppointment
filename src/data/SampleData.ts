// Data/SampleData.ts

import { Appointment } from "../models/Appointment";
import { Cancellation } from "../models/Cancellation";
import { Doctor } from "../models/Doctor";
import { Hospital } from "../models/Hospital";
import { Patient } from "../models/Patient";
import { Payment } from "../models/Payment";
import { Review } from "../models/Review";
import { Schedule } from "../models/Schedule";
import { Specialization } from "../models/Specialization";

export const specializations: Specialization[] = [
  {specializationId: '1', name: 'Cardiology'},
  {specializationId: '2', name: 'Dermatology'},
  {specializationId: '3', name: 'Neurology'},
];

export const hospitals: Hospital[] = [
  {
    hospitalId: '1',
    name: 'General Hospital',
    email: 'contact@generalhospital.com',
    address: '123 Main St, Toronto, ON',
  },
  {
    hospitalId: '2',
    name: 'City Health Clinic',
    email: 'info@cityhealthclinic.com',
    address: '456 Health Blvd, Vaughan, ON',
  },
];

export const doctors: Doctor[] = [
  {
    doctorId: '1',
    name: 'Dr. Bowen Chan',
    email: 'dr.chan@hospital.com',
    phone: '416-486-1956',
    image: '/img/doctors/chan.jpg',
    hospitalId: '1',
    specializationId: '1',
  },
  {
    doctorId: '2',
    name: 'Dr. Sharon Hind',
    email: 'dr.hind@clinic.com',
    phone: '416-486-1967',
    image: '/img/doctors/hind.jpg',
    hospitalId: '2',
    specializationId: '2',
  },
];

export const schedules: Schedule[] = [
  {
    scheduleId: 1,
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-19T15:30:00'), // Time remains as a string
    endTime: new Date('2024-10-19T15:30:00'), // Time remains as a string
    doctorId: 1,
  },
  {
    scheduleId: 2,
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-19T15:30:00'),
    endTime: new Date('2024-10-19T15:30:00'),
    doctorId: 2,
  },
];

export const patients: Patient[] = [
  {
    patientId: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '647-555-1234',
    image: '/img/patients/johndoe.jpg',
  },
  {
    patientId: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '647-555-5678',
    image: '/img/patients/janesmith.jpg',
  },
];

export const appointments: Appointment[] = [
  {
    appointmentId: '1',
    scheduleDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-19T09:30:00'), // Time as a string
    endTime: new Date('2024-10-19T11:30:00'), // Time as a string
    status: 'Confirmed',
    note: 'Initial consultation',
    patientId: '1',
    doctorId: '1',
  },
  {
    appointmentId: '2',
    scheduleDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-19T09:30:00'),
    endTime: new Date('2024-10-19T11:30:00'),
    status: 'Pending',
    note: 'Follow-up visit',
    patientId: '2',
    doctorId: '2',
  },
];

export const reviews: Review[] = [
  {
    reviewId: '1',
    rating: 5,
    comment: 'Excellent doctor, very caring.',
    doctorId: '1',
    patientId: '1',
    appointmentId: '1',
  },
  {
    reviewId: '2',
    rating: 4.5,
    comment: 'Good doctor, but wait time was long.',
    doctorId: '2',
    patientId: '2',
    appointmentId: '2',
  },
];

export const payments: Payment[] = [
  {
    paymentId: '1',
    amount: 100.0,
    paymentMethod: 'Credit Card',
    status: 'paid',
    appointmentId: '1',
  },
  {
    paymentId: '2',
    amount: 75.0,
    paymentMethod: 'Cash',
    status: 'unpaid',
    appointmentId: '2',
  },
];

export const cancellations: Cancellation[] = [
  {
    cancellationId: 1,
    cancelReason: 'Family emergency',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-19T15:30:00'), // This is a full date-time object
    appointmentId: 2,
  },
];



