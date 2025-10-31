import { FunctionComponent, HTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = {} & HTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-block p-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
