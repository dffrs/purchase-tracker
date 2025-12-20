const BASE = "http://localhost:8080/api/v1/";

export const getAllProducts = async () => {
  const url = BASE + "products";

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) throw Error("Failed to get all users");

    const result = (await response.json()) as Product[];

    await new Promise((r) => setTimeout(r, 2_000));

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
