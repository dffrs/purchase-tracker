import { getAllOrders } from "@/api";
import { useEffect, useState } from "react";

export const useGetAllOrders = () => {
  const [orders, setOrders] = useState<OrderResponse[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState<Error | null>(() => null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [allOrders, err] = await getAllOrders();
      if (err != null) {
        setIsLoading(false);
        setOrders([]);
        setError(err);
        return;
      }

      setOrders(allOrders);
      setIsLoading(false);
      setError(null);
    })();
  }, []);

  return [orders, isLoading, error] as const;
};
