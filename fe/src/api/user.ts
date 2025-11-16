const BASE = "http://localhost:8080/api/v1/";

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
