import { getAllOrdersStatsForYear } from "@/api";
import { useEffect, useState } from "react";

export const getAllOrdersStatsForYearTag = { count: 0 };

export const useGetAllOrderStatsForYear = (year: string) => {
  const [stats, setStats] = useState<number[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState<Error | null>(() => null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [stats, err] = await getAllOrdersStatsForYear(year);
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
  }, [year, getAllOrdersStatsForYearTag.count]);

  return [stats, isLoading, error] as const;
};
