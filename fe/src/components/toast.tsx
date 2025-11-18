import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Button } from "./button";
import { Icon } from "./icon";
import { IoClose } from "react-icons/io5";

type ToastCtx = {
  createToast: () => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw Error("ToastContext was not found");

  return ctx;
};

type ToastProps = {
  id: number;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const Toast: FunctionComponent<PropsWithChildren<ToastProps>> = ({
  id,
  onClose,
  children,
}) => {
  return (
    <span className="bg-contrast p-2 rounded-xl shadow-md flex flex items-center gap-x-2">
      <Button
        id={String(id)}
        className="shadow-none rounded-full p-0"
        onClick={onClose}
      >
        <Icon title="Close" className="text-base">
          <IoClose />
        </Icon>
      </Button>
      <span className="max-w-[25ch] overflow-ellipsis whitespace-nowrap overflow-clip">
        {children}
      </span>
    </span>
  );
};

export const ToastProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<number[]>(() => []);

  const createToast = () => {
    setToasts((prev) => [...prev, (prev.at(-1) ?? 0) + 1]);
  };

  const onClose: ToastProps["onClose"] = useCallback((event) => {
    const toastId = event.currentTarget.id;
    setToasts((prev) => prev.filter((t) => t !== +toastId));
  }, []);

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <ul className="absolute bottom-10 left-[50%] max-h-96 py-1 flex flex-col gap-y-2 overflow-hidden">
        {toasts?.map((toast, i) => {
          return (
            <li key={i}>
              <Toast id={toast} onClose={onClose}>
                toast {toast}
              </Toast>
            </li>
          );
        })}
      </ul>
    </ToastContext.Provider>
  );
};
