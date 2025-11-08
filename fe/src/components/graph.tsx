import { FunctionComponent } from "react";

type GraphProps = {
  data: Array<number>;
};

const mockData = [
  34.7, 68.9, 65.1, 130.2, 208.6, 172.8, 155.0, 168.6, 134.4, 52.7, 94.5, 41.5,
];

export const Graph: FunctionComponent<GraphProps> = ({ data = mockData }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);

  // for (i = 0; i < data.length; i++) {
  //   h = Math.round(100 * ((data[i] - min) / max));
  //   html +=
  //     '<div class="bar" style="height:' +
  //     h +
  //     "%; left:" +
  //     12 * i +
  //     'px">' +
  //     data[i] +
  //     "</div>";
  // }

  return (
    <div className="bg-pop relative h-full w-full table-cell align-bottom">
      {data.map((value, i) => {
        const h = Math.round(100 * ((value - min) / max));
        return (
          <div
            className="absolute bottom-0 inline-block w-[10px] m-0 bg-contrast"
            style={{ height: h + "%", left: data.length * i + "px" }}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};
