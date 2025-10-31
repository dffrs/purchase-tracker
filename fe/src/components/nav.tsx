import { FunctionComponent } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";

import { Icon } from "./icon";

type NavBarProps = {
  className?: string;
};

export const Navbar: FunctionComponent<NavBarProps> = ({ className }) => {
  return (
    <nav className={`flex items-center p-3 text-contrast ${className}`}>
      <div className="flex flex-row gap-x-2 items-center">
        <Icon id="icon" title="Purchase Tracker">
          <RiMoneyEuroCircleLine />
        </Icon>
        <label htmlFor="icon" className="text-xs">
          Purchase Tracker
        </label>
      </div>
      <div className="flex flex-row gap-x-2 ml-auto">
        <Icon title="Settings">
          <IoSettingsOutline />
        </Icon>
      </div>
    </nav>
  );
};
