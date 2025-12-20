import { getFormElements } from "@/util";

export const getUserValues = (form: HTMLFormElement) => {
  // user
  const firstName = getFormElements<HTMLInputElement>(
    form.elements,
    "firstName",
  );
  const lastName = getFormElements<HTMLInputElement>(form.elements, "lastName");
  const email = getFormElements<HTMLInputElement>(form.elements, "email");
  const phone = getFormElements<HTMLInputElement>(form.elements, "phone");

  // address
  const street = getFormElements<HTMLInputElement>(form.elements, "street");
  const streetNumber = getFormElements<HTMLInputElement>(
    form.elements,
    "streetNumber",
  );
  const apartment = getFormElements<HTMLInputElement>(
    form.elements,
    "apartment",
  );

  // city
  const cityName = getFormElements<HTMLInputElement>(form.elements, "city");
  const countryField = getFormElements<HTMLInputElement>(
    form.elements,
    "country",
  );
  const zipCode = getFormElements<HTMLInputElement>(form.elements, "zipCode");

  const country: Country = {
    name: countryField?.value ?? "",
    code: "",
  };

  const city: City = {
    name: cityName?.value ?? "",
    country: country,
    zipCode: zipCode?.value ?? "",
  };

  const address: Address = {
    street: street?.value ?? "",
    streetNumber: streetNumber?.value ?? "",
    apartment: apartment?.value ?? "",
    city: city,
  };

  const user: Omit<User, "id" | "created_at"> = {
    name: [firstName?.value, lastName?.value].join(" "),
    email: email?.value ?? "",
    phone: Number(phone?.value ?? -1),
    address: address,
  };

  return user;
};

export const getPaymentValue = (form: HTMLFormElement) => {
  const payment = getFormElements<HTMLInputElement>(
    form,
    "[name='payment']:checked",
  )[0];

  return payment?.id;
};

export const getDeliveryValue = (form: HTMLFormElement) => {
  const delivery = getFormElements<HTMLInputElement>(
    form,
    "[name='delivery']:checked",
  )[0];

  return delivery?.id;
};

export const getProductValues = (form: HTMLFormElement) => {
  const pName = getFormElements<HTMLFormElement>(
    form,
    "[id^='product'][id$='name']",
  );
  const pCode = getFormElements<HTMLInputElement>(
    form,
    "[id^='product'][id$='code']",
  );

  const pQuantity = getFormElements<HTMLInputElement>(
    form,
    "[id^='product'][id$='quantity']",
  );

  const pRRP = getFormElements<HTMLInputElement>(
    form,
    "[id^='product'][id$='rrp']",
  );

  const pWSP = getFormElements<HTMLInputElement>(
    form,
    "[id^='product'][id$='wsp']",
  );

  const pProfit = getFormElements<HTMLInputElement>(
    form,
    "[id^='product'][id$='profit']",
  );

  const products: Array<Omit<Product, "id">> = [];

  for (let i = 0; i < pName.length; i++) {
    const name = String(pName[i]?.value ?? "");
    const code = String(pCode[i]?.value ?? "");
    const quantity = Number(pQuantity[i]?.value);
    const rrp = Number(pRRP[i]?.value);
    const wsp = Number(pWSP[i]?.value);
    const profit = Number(pProfit[i]?.value);

    products.push({ name, code, quantity, rrp, wsp, profit });
  }

  return products;
};
