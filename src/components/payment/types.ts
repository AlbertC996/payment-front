export interface OrderData {
  from: string;
  to: string;
  amount: string;
  address: string;
  country: string;
  email: string;
}

export interface CreateOrderResponse {
  success: boolean;
  payUrl?: string;
  transactionId?: string;
  message?: string;
  details?: string;
}