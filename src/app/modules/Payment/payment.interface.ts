export interface IPayment {
  transactionId: string;
  cartId?: string;
  userId?: string;
  productId?: string;
  price: number;
  quantity: number;
  paidStatus?: string | boolean;
}
