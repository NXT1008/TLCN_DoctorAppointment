export interface Patient {
  patientId: string;
  name: string;
  nickname?: string;
  gender: string;
  email: string;
  phone: string;
  image: string;
  favoriteDoctors?: string[]
}
