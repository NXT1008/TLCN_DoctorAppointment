
interface Hospital{
    hospitalId: string;        
    name: string;  
    location: string
}

export interface User {
    id: string;                  
    name: string;              
    email: string;          
    phone: string;           
    role: string;                 
    profileImage: string;         
    address: string;             
    medicalHistory: string[];    
    specializationId: string;     
    hospitals: Hospital[];        
    ratings: number;             
  }

  