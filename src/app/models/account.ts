export interface Account {
  id: number
  accountNumber: string,
  clientNumber: number,
  currency: string
  accountType: string,
  accountStatus: string
  createdAt: string | null | Date

  [key: string]: any;

}
