import { getAllOrdersStatsPerMonth } from "@/api";
import { useEffect, useState } from "react";

export const getAllOrdersStatsPerMonthTag = { count: 0 };

export const useGetAllOrderStatsPerMonth = (year: string) => {
  const [stats, setStats] = useState<number[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState<Error | null>(() => null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [stats, err] = await getAllOrdersStatsPerMonth(year);
      if (err !== null) {
        setError(err);
        setIsLoading(false);
        setStats([]);
        return;
      }

      setStats(stats);
      setIsLoading(false);
      setError(null);
    })();
  }, [year, getAllOrdersStatsPerMonthTag.count]);

  return [stats, isLoading, error] as const;
};
