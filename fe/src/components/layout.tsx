import { FunctionComponent, PropsWithChildren } from "react";
import { Navbar } from "./nav";

const COLS = 5;

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={`h-full grid grid-flow-row grid-rows-[auto,1fr] grid-cols-${COLS}`}
    >
      <Navbar className={`col-span-${COLS}`} />
      <aside className="bg-contrast text-primary">
        <p>hello there</p>
        <p>hello there</p>
        <p>hello there</p>
        <p>hello there</p>
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
  );
};
