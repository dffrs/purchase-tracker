import {
  ButtonHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
} from "react";

type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      className={`inline-block p-2 rounded-md shadow-xl cursor-pointer transition hover:scale-110 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
