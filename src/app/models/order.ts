import { Product } from "./product";

export interface Order {
  fullName: string
  address: string
  orderProducts: Product[],
  phone_number: string,
  email: string
}