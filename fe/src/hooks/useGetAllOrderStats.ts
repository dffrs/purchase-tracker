import { getAllOrdersStats } from "@/api";
import { useEffect, useState } from "react";

const DEFAULT_VALUE = { count: 0, profit: 0 };

export const getAllOrdersStatsTag = { count: 0 };

export const useGetAllOrderStats = (year: string) => {
  const [stats, setStats] = useState<OrderStats>(() => DEFAULT_VALUE);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState<Error | null>(() => null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [stats, err] = await getAllOrdersStats(year);
      if (err !== null) {
        setError(err);
        setIsLoading(false);
        setStats(DEFAULT_VALUE);
        return;
      }

      setStats(stats);
      setIsLoading(false);
      setError(null);
    })();
  }, [getAllOrdersStatsTag.count, year]);

  return [stats, isLoading, error] as const;
};
