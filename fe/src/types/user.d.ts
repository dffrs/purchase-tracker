type User = {
  id: number;
  name: string;
  email: string;
  phone: number;
  created_at: string;
  address?: Address;
};

type Address = {
  street: string;
  streetNumber: string;
  apartment: string;
  city: City;
};

type City = {
  name: string;
  zipCode: string;
  country: Country;
};

type Country = {
  code: string;
  name: string;
};

type UserPayload = Omit<User, "id" | "created_at">;
