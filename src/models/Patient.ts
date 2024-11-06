export interface Patient {
  patientId: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  image: string;
  favoriteDoctors?: string[];
  address?: string;
}
