type OrderPayload = {
  user: UserPayload;
  payment: string;
  delivery: string;
  products: Array<Omit<Product, "id">>;
};
