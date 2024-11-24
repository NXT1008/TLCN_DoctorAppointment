export interface Patient {
  patientId: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  image: string;
  favoriteDoctors?: string[];
  dateOfBirth?: Date;
  address?: string;
  bloodPressure?: string,
  heartRate?: string,
  bloodSugar?: string,
  BMI?: string
}
