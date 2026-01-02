import { FunctionComponent, PropsWithChildren } from "react";
import { Button } from "./button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type TabsProps = {
  onDecrease: () => void;
  onIncrease: () => void;
};

export const Tabs: FunctionComponent<PropsWithChildren<TabsProps>> = ({
  onDecrease,
  onIncrease,
  children,
}) => {
  return (
    <span className="flex text-contrast items-center gap-x-2 *:shadow-none">
      <Button onClick={onDecrease}>
        <IoIosArrowBack />
      </Button>
      {children}
      <Button onClick={onIncrease}>
        <IoIosArrowForward />
      </Button>
    </span>
  );
};
