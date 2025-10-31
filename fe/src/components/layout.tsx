import { FunctionComponent, PropsWithChildren } from "react";
import { Navbar } from "./nav";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full grid grid-flow-row grid-rows-[auto,1fr]">
      <Navbar />
      {children}
    </div>
  );
};
