import { Graph } from "@/components";
import { FunctionComponent } from "react";

const mockData = [
  34.7, 68.9, 65.1, 130.2, 208.6, 172.8, 155.0, 168.6, 134.4, 52.7, 94.5, 41.5,
];

export const Home: FunctionComponent = () => {
  return (
    <div className="h-full w-full grid grid-flow-row grid-rows-[auto,1fr] gap-y-8">
      <ul className="grid grid-cols-2 gap-x-8 h-96">
        <li className="card">
          <span className="card-layout">
            <h1 className="card-header">Orders</h1>
            <p className="card-text">42</p>
          </span>
        </li>
        <li className="card">
          <span className="card-layout">
            <h1 className="card-header">Profit</h1>
            <p className="card-text">€ 134,43</p>
          </span>
        </li>
      </ul>
      <div className="card">
        <span className="card-layout items-start">
          <p className="card-header">2025</p>
          <Graph data={mockData} />
        </span>
      </div>
    </div>
  );
};
