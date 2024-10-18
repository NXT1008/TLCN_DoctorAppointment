<<<<<<< HEAD
interface Appointment {
  appointmentId: number;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  patientId: number;
  doctorId: number;
}

=======
interface AppointmentSchedule {
    date: Date; 
    startTime: Date; 
    endTime: Date; 
  }
  
export interface Appointment {
    id: string; 
    patientId: string; 
    doctorId: string; 
    hospitalId: string; 
    specializationId: string; 
    schedule: AppointmentSchedule; 
    status: 'completed' | 'booked' | 'canceled'; 
    note?: string; 
  }
  
>>>>>>> 447045d (push my project)
