import { Graph, useToast } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllOrderStats, useGetAllOrderStatsForYear } from "@/hooks";
import { FunctionComponent, useEffect } from "react";

const mockData = [
  34.7, 68.9, 65.1, 130.2, 208.6, 172.8, 155.0, 168.6, 134.4, 52.7, 94.5, 41.5,
];

export const Home: FunctionComponent = () => {
  const [stats, isLoading, error] = useGetAllOrderStats();
  const [yearStats, isLoadingYear, errorYear] =
    useGetAllOrderStatsForYear("2025");

  const createToast = useToast();

  useEffect(() => {
    if (error != null) createToast("Failed to get stats");
  }, [error]);

  useEffect(() => {
    if (errorYear != null) createToast("Failed to get year stats");
  }, [errorYear]);

  useEffect(() => {
    console.log("yearStats", yearStats);
  }, [yearStats]);

  return (
    <div className="h-full w-full grid grid-flow-row grid-rows-[auto,1fr] gap-y-8">
      <ul className="grid grid-cols-2 gap-x-8 h-96">
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
                {stats.profit.toLocaleString("en", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 2,
                  trailingZeroDisplay: "stripIfInteger",
                })}
              </p>
            </LoadingArea>
          </span>
        </li>
      </ul>
      <div className="card">
        <span className="card-layout">
          <h1 className="card-header">2025</h1>
          <LoadingArea isLoading={isLoadingYear}>
            <Graph data={mockData} />
          </LoadingArea>
        </span>
      </div>
    </div>
  );
};
