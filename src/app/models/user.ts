export interface User {
  id: number,
  clientNumber: string,
  firstName: string,
  lastName: string,
  gender: string,
  personalNumber: number,
  phoneNumber: number,
  legalCountry: string,
  legalCity: string,
  legalAddress: string,
  actualCountry: string,
  actualCity: string,
  actualAddress: string
  avatar: string
  createdAt: string | null | Date

  [key: string]: any;
}
export interface CustomersDropdown {
  id: number
  firstName: string,
  lastName: string,
}

