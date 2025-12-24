const BASE = "http://localhost:8080/api/v1/";

export const createOrder = async (user: OrderPayload) => {
  const url = BASE + "orderItems";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const err = (await response.json()) as Err;
      throw new Error("Failed to create order", { cause: err.error });
    }

    const result = (await response.json()) as unknown;

    await new Promise((r) => setTimeout(r, 2_000));

    return [result, null] as const;
  } catch (e) {
    const error = e as Error;
    console.error(error);

    return [null, error] as const;
  }
};

export const getAllOrders = async () => {
  const url = BASE + "orderItems";

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const err = (await response.json()) as Err;
      throw new Error("Failed to get all orders", { cause: err.error });
    }

    const result = (await response.json()) as OrderResponse[];

    await new Promise((r) => setTimeout(r, 2_000));

    return [result, null] as const;
  } catch (e) {
    const error = e as Error;
    console.error(error);

    return [null, error] as const;
  }
};
