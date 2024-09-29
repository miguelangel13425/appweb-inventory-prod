import { Base } from './base'

export interface Role extends Base {
    name: string;
    description?: string;
}
  
export interface User extends Base {
    email: string;
    first_name: string;
    last_name: string;
    role: Role[];
    is_staff: boolean;
    date_joined: string;
}
  
export interface Profile extends Base {
    user: User;
    gender: string;
    birthdate?: string;
    bio?: string;
    age?: number;
}
  
export interface Person extends Base {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
}
  
export interface Student extends Person {
    control_number: string;
    degree: string;
}
  
export interface Provider extends Person {
    RFC: string;
    NSS: string;
}