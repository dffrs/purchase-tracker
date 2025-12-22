const BASE = "http://localhost:8080/api/v1/";

export const createUser = async (user: UserPayload) => {
  const url = BASE + "user";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (!response.ok) throw Error("Failed to create user");

    const result = (await response.json()) as User;

    await new Promise((r) => setTimeout(r, 2_000));

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllUsers = async () => {
  const url = BASE + "users";

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) throw Error("Failed to get all users");

    const result = (await response.json()) as User[];

    await new Promise((r) => setTimeout(r, 2_000));

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
