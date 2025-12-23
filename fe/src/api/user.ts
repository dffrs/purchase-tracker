const BASE = "http://localhost:8080/api/v1/";

export const createUser = async (user: UserPayload) => {
  const url = BASE + "user";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const err = (await response.json()) as Err;
      throw new Error("Failed to create user", { cause: err.error });
    }

    const result = (await response.json()) as User;

    await new Promise((r) => setTimeout(r, 2_000));

    return [result, null] as const;
  } catch (e) {
    const error = e as Error;
    console.error(error);

    return [null, error] as const;
  }
};

export const getAllUsers = async () => {
  const url = BASE + "users";

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      const err = (await response.json()) as Err;
      throw new Error("Failed to get all users", { cause: err.error });
    }

    const result = (await response.json()) as User[];

    await new Promise((r) => setTimeout(r, 2_000));

    return [result, null] as const;
  } catch (e) {
    const error = e as Error;
    console.error(error);

    return [null, error] as const;
  }
};
