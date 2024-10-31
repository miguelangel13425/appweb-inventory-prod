import { Base } from './base'

export interface User extends Base {
  email: string
  first_name: string
  last_name: string
  role: string
  role_display?: string
  is_staff: boolean
  date_joined: string
  profile: Profile
}

export interface Profile extends Base {
  gender: string
  gender_display?: string
  birthdate?: string
  bio?: string
  age?: number
}

export interface Person extends Base {
  first_name: string
  last_name: string
  email: string
  phone_number?: string
}

export interface Student extends Person {
  control_number: string
  degree: string
  degree_display?: string
}

export interface Provider extends Person {
  RFC: string
  NSS: string
}
