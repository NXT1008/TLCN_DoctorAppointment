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
  