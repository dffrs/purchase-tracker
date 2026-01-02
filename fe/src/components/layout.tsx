import { FunctionComponent, PropsWithChildren } from "react";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full grid grid-flow-row grid-rows-[1fr]">{children}</div>
  );
};
