import { FunctionComponent } from "react";

type GraphProps = {
  data: Array<number>;
};

const mockData = [
  34.7, 68.9, 65.1, 130.2, 208.6, 172.8, 155.0, 168.6, 134.4, 52.7, 94.5, 41.5,
];

export const Graph: FunctionComponent<GraphProps> = ({ data = mockData }) => {
  const max = Math.max(...data);
  const min = Math.min(...data) * 0.1;

  return (
    <div className="bg-pop h-full w-full flex items-end gap-x-4">
      {data.map((value, i) => {
        const h = Math.round(100 * ((value - min) / max));

        return (
          <div
            className="w-28 bg-contrast rounded-t-xl"
            style={{ height: `${h}%`, left: `${data.length * i}px` }}
            title={String(value)}
          />
        );
      })}
    </div>
  );
};
