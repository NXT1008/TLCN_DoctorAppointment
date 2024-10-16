export interface Review {
    id: string;
    appointmentId: string;
    doctorId: string;
    patientId: string;
    rating: number;
    comment: string;
  }