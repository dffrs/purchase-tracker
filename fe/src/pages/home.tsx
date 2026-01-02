import { Graph, useToast } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllOrderStats, useGetAllOrderStatsForYear } from "@/hooks";
import { formatCurrency } from "@/util";
import { FunctionComponent, useEffect } from "react";

export const Home: FunctionComponent = () => {
  const [stats, isLoading, error] = useGetAllOrderStats();
  const [yearStats, _, errorYear] = useGetAllOrderStatsForYear(
    new Date().getUTCFullYear().toString(),
  );

  const createToast = useToast();

  useEffect(() => {
    if (error != null) createToast("Failed to get stats");
  }, [error]);

  useEffect(() => {
    if (errorYear != null) createToast("Failed to get year stats");
  }, [errorYear]);

  return (
    <div className="h-full w-full grid grid-flow-row grid-rows-[auto,1fr] gap-y-6">
      <ul className="grid grid-cols-2 gap-x-6 h-96">
        <li className="card overflow-hidden">
          <span className="card-layout">
            <h1 className="card-header">Orders</h1>
            <LoadingArea isLoading={isLoading}>
              <p className="card-text animate-fadeAndMoveIn">
                {stats.count.toLocaleString("en", { style: "decimal" })}
              </p>
            </LoadingArea>
          </span>
        </li>
        <li className="card overflow-hidden">
          <span className="card-layout">
            <h1 className="card-header">Profit</h1>
            <LoadingArea isLoading={isLoading}>
              <p className="card-text animate-fadeAndMoveIn">
                {formatCurrency(stats.profit)}
              </p>
            </LoadingArea>
          </span>
        </li>
      </ul>
      <div className="card">
        <span className="card-layout overflow-hidden">
          <h1 className="card-header">2025</h1>
          <Graph data={yearStats} />
        </span>
      </div>
    </div>
  );
};
