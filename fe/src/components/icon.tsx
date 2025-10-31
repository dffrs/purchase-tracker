import { FunctionComponent, PropsWithChildren } from "react";

type IconProps = {
  id?: string;
  title?: string;
  className?: string;
};

export const Icon: FunctionComponent<PropsWithChildren<IconProps>> = ({
  title,
  className,
  children,
}) => {
  return (
    <span
      id="icon-wrapper"
      className={`text-4xl cursor-pointer transition hover:scale-110 ${className}`}
      title={title}
    >
      {children}
    </span>
  );
};
