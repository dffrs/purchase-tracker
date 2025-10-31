import { FunctionComponent, PropsWithChildren } from "react";

type IconProps = {
  id?: string;
  title?: string;
};

export const Icon: FunctionComponent<PropsWithChildren<IconProps>> = ({
  title,
  children,
}) => {
  return (
    <span
      id="icon-wrapper"
      className="text-4xl cursor-pointer transition hover:scale-110"
      title={title}
    >
      {children}
    </span>
  );
};
