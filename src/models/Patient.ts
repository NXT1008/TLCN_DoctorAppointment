export interface Patient {
  patientId: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  image: string;
  dateOfBirth?: Date;
  favoriteDoctors?: string[];
  address?: string;
  bloodPressure?: string,
  heartRate?: string,
  bloodSugar?: string,
  BMI?: string
}
