export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: any;
  };
  phone?: number;
  website?: string;
  company?: { name: string };
}
