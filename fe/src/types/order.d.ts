type OrderPayload = {
  user: UserPayload;
  payment: string;
  delivery: string;
  products: Array<Omit<Product, "id">>;
  createdAt: string | null;
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

type OrderStats = {
  count: number;
  profit: number;
};
