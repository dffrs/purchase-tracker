import { FunctionComponent } from "react";

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
      <div className="rounded-xl bg-secondary shadow-xl flex justify-center items-center">
        <p className="text-pop">there will be a graph here</p>
      </div>
    </div>
  );
};
