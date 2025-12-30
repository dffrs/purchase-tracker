import { formatCurrency } from "@/util";
import { FunctionComponent } from "react";

const CEIL = 1.1;
const FLOOR = 0.1;

const hideIfZero = (value: number) => {
  return value ? formatCurrency(value) : "";
};

type GraphProps = { data: Array<number> };

export const Graph: FunctionComponent<GraphProps> = ({ data }) => {
  const max = Math.max(...data) * CEIL;
  const min = Math.min(...data) * FLOOR;

  return (
    <div className="h-full w-full grid grid-cols-12 items-end gap-x-4 overflow-hidden">
      {data.map((value, i) => {
        const height = Math.round(100 * ((value - min) / max));
        const currency = hideIfZero(value);

        const date = new Date();
        date.setMonth(i);

        return (
          <div
            key={i}
            style={{ height: `${height}%` }}
            data-value={currency}
            className="relative bg-pop rounded-t-xl flex items-end animate-fadeAndMoveIn justify-center after:content-[attr(data-value)] after:absolute after:top-[-2rem] after:text-pop"
          >
            <p className={`${currency ? "text-secondary" : "text-pop"}`}>
              {date.toLocaleString("default", { month: "short" })}
            </p>
          </div>
        );
      })}
    </div>
  );
};
