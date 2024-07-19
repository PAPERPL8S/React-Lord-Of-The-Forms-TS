export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string | string[];
  [key: string]: any;
}
