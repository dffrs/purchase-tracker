type User = {
  id: number;
  name: string;
  email: string | null;
  phone: number;
  created_at: string;
  address: Address | null;
};

type Address = {
  street: string | null;
  streetNumber: string | null;
  apartment: string | null;
  city: City | null;
};

type City = {
  name: string | null;
  zipCode: string | null;
  country: Country | null;
};

type Country = {
  code: string | null;
  name: string | null;
};

type UserPayload = Omit<User, "id" | "created_at">;
