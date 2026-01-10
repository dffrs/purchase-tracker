import { Button, Graph, useToast } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllOrderStats, useGetAllOrderStatsPerMonth } from "@/hooks";
import { formatCurrency } from "@/util";
import { FunctionComponent, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Home: FunctionComponent = () => {
  const [currentYear, setCurrentYear] = useState(() =>
    new Date().getUTCFullYear().toString(),
  );

  const [stats, isLoading, error] = useGetAllOrderStats(currentYear);
  const [yearStats, _, errorYear] = useGetAllOrderStatsPerMonth(currentYear);

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
          <span className="flex text-contrast items-center gap-x-2 *:shadow-none">
            <Button
              onClick={() => setCurrentYear((y) => (Number(y) - 1).toString())}
            >
              <IoIosArrowBack />
            </Button>
            <h1 className="card-header">{currentYear}</h1>
            <Button
              onClick={() => setCurrentYear((y) => (Number(y) + 1).toString())}
              disabled={currentYear === new Date().getUTCFullYear().toString()}
            >
              <IoIosArrowForward />
            </Button>
          </span>
          <Graph data={yearStats} />
        </span>
      </div>
    </div>
  );
};
