import { getAllOrdersStatsForYear } from "@/api";
import { useEffect, useState } from "react";

export const useGetAllOrderStatsForYear = (year: string) => {
  const [stats, setStats] = useState<OrderYearStats[]>(() => []);
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
  }, [year]);

  return [stats, isLoading, error] as const;
};
