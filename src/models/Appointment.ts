export interface Appointment {
  appointmentId: string;
  scheduleDate: Date;
  startTime: Date;
  endTime: Date;
  status: string;
  note: string;
  scheduleId?: string;
  patientId: string;
  doctorId: string;
}
