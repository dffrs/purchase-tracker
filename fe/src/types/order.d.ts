type OrderPayload = {
  user: UserPayload;
  payment: string;
  delivery: string;
  products: Array<Omit<Product, "id">>;
};

type OrderResponse = {
  name: string;
  email: string;
  phone: number;
  productName: string;
  productCode: string;
  productRRP: number;
  productWSP: number;
  orderDate: string;
  quantity: number;
  rrpAtPurchase: number;
  wspAtPurchase: number;
};
