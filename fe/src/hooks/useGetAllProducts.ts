import { getAllProducts } from "@/api";
import { useEffect, useState } from "react";

export const useGetAllProducts = (): [Product[], boolean] => {
  const [users, setUsers] = useState<Product[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const allProducts = await getAllProducts();

      setUsers(allProducts ?? []);
      setIsLoading(false);
    })();
  }, []);

  return [users, isLoading];
};
