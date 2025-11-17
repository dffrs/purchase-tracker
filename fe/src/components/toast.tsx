import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type ToastCtx = {
  createToast: () => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw Error("ToastContext was not found");

  return ctx;
};

export const ToastProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<any[]>(() => []);

  const createToast = () => {
    setToasts((prev) => [...prev, (prev.at(-1) ?? 0) + 1]);
  };

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <ul className="absolute bottom-10 left-[50%] max-h-80 p-2 flex flex-col gap-y-4">
        {toasts?.map((toast, i) => {
          return <li className="bg-contrast">toast {i + 1}</li>;
        })}
      </ul>
    </ToastContext.Provider>
  );
};
