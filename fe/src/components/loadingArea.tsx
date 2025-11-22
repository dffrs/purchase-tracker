import { FunctionComponent, PropsWithChildren } from "react";

type LoadingAreaProps = {
  isLoading: boolean;
  className?: string;
};

export const LoadingArea: FunctionComponent<
  PropsWithChildren<LoadingAreaProps>
> = ({ isLoading, children, className = "" }) => {
  return (
    <div
      className={`w-full h-auto transition-all ${isLoading ? "blur-sm brightness-90 animate-pulse pointer-events-none" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
