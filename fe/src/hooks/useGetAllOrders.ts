import { getAllOrders, searchOrders } from "@/api";
import { useCallback, useEffect, useState } from "react";

export const getAllOrdersTag = { count: 0 };

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
  }, [getAllOrdersTag.count]);

  const onSearch = useCallback(
    async (keyword: string) => {
      setIsLoading(true);

      const cb = !keyword
        ? async () => await getAllOrders()
        : async () => await searchOrders(keyword);

      const [orders, err] = await cb();
      if (err != null) {
        setIsLoading(false);
        setOrders([]);
        setError(err);
        return;
      }

      setOrders(orders);
      setIsLoading(false);
      setError(null);
    },
    [getAllOrdersTag.count],
  );

  return [orders, onSearch, isLoading, error] as const;
};
