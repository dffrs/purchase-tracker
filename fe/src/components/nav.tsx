import { FunctionComponent, PropsWithChildren } from "react";

export const Navbar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="grid grid-flow-col items-center justify-around gap-x-2 bg-white text-black min-h-10 max-h-12">
      {children}
    </nav>
  );
};
