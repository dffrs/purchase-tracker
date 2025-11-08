import { FunctionComponent } from "react";

export const Home: FunctionComponent = () => {
  return (
    <div className="h-full w-full grid grid-flow-row grid-rows-[auto,1fr]">
      <ul className="grid grid-cols-2 gap-x-8 h-96">
        <li className="rounded-xl bg-secondary shadow-xl">
          <span className="flex flex-col gap-y-4 justify-center items-start h-full p-8">
            <h1 className="font-bold text-2xl text-contrast">Orders</h1>
            <p className="text-9xl text-pop">42</p>
          </span>
        </li>
        <li className="rounded-xl bg-secondary shadow-xl">
          <span className="flex flex-col gap-y-4 justify-center items-start h-full p-8">
            <h1 className="font-bold text-2xl text-contrast">Profit</h1>
            <p className="text-9xl text-pop">€ 134,43</p>
          </span>
        </li>
      </ul>
      <div>another section</div>
    </div>
  );
};
