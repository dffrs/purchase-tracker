import { formatCurrency } from "@/util";
import { FunctionComponent } from "react";

const CEIL = 1.1;
const FLOOR = 0.1;

const hideIfZero = (value: number) => {
  return value ? formatCurrency(value) : "";
};

const getHeight = (arg: number, min: number, max: number) => {
  const height = Math.round(100 * ((arg - min) / max));

  return isNaN(height) ? 0 : height;
};

type GraphProps = { data: Array<number> };

export const Graph: FunctionComponent<GraphProps> = ({ data }) => {
  const max = Math.max(...data) * CEIL;
  const min = Math.min(...data) * FLOOR;

  return (
    <div className="h-full w-full grid grid-cols-12 items-end gap-x-4 overflow-visible">
      {data.map((value, i) => {
        const height = getHeight(value, min, max);
        const currency = hideIfZero(value);

        const date = new Date();
        date.setDate(1); // set to first day, otherwise we might get 'date overflow'
        date.setMonth(i);

        return (
          <div
            key={i}
            style={{ height: `${height}%` }}
            data-value={currency}
            className="relative bg-pop rounded-t-xl flex items-end animate-fadeAndMoveIn justify-center after:content-[attr(data-value)] after:absolute after:top-[-2rem] after:text-pop"
          >
            <p className={`${currency ? "text-secondary" : "text-pop"}`}>
              {date.toLocaleString(undefined, { month: "short" })}
            </p>
          </div>
        );
      })}
    </div>
  );
};
