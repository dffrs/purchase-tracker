import { FunctionComponent } from "react";

export const Home: FunctionComponent = () => {
  return (
    <div className="h-full w-full grid grid-flow-row grid-rows-[auto,1fr]">
      <ul className="grid grid-flow-col gap-x-4 h-96">
        <li className="rounded-xl bg-secondary shadow-md">
          <span className="flex gap-x-4 justify-center">
            <h1 className="font-normal">Total Spent:</h1>
            <p className="text-5xl">$100</p>
          </span>
        </li>
        <li className="rounded-xl bg-secondary shadow-md">
          <span className="flex items-center gap-x-4 justify-center">
            <h1 className="font-normal">Total Spent:</h1>
            <p className="text-5xl">$100</p>
          </span>
        </li>
        <li className="rounded-xl bg-secondary shadow-md">
          <span className="flex items-center gap-x-4 justify-center">
            <h1 className="font-normal">Total Spent:</h1>
            <p className="text-5xl">$100</p>
          </span>
        </li>
      </ul>
      <div>another section</div>
    </div>
  );
};
