import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Button } from "./button";
import { Icon } from "./icon";
import { IoClose } from "react-icons/io5";

const TIMEOUT = 5_000;

type ToastCtx = { createToast: (message: string) => void };

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
    <span className="bg-contrast p-2 rounded-xl shadow-md flex items-center">
      <Button
        id={String(id)}
        className="!shadow-none rounded-full p-0"
        onClick={onClose}
      >
        <Icon title="Close" className="text-base">
          <IoClose />
        </Icon>
      </Button>
      <span className="max-w-[25ch] overflow-ellipsis whitespace-nowrap overflow-clip mr-4">
        {children}
      </span>
    </span>
  );
};

type Toast = {
  id: number;
  message: string;
};

export const ToastProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>(() => []);

  const createToast = useCallback((message: string) => {
    setToasts((prev) => {
      const newToast = (prev.at(-1)?.id ?? 0) + 1;

      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== newToast)),
        TIMEOUT,
      );

      return [
        ...prev,
        { id: newToast, message: message || newToast.toString() },
      ];
    });
  }, []);

  const onClose: ToastProps["onClose"] = useCallback((event) => {
    const toastId = event.currentTarget.id;
    setToasts((prev) => prev.filter((t) => t.id !== +toastId));
  }, []);

  return (
    <ToastContext.Provider
      value={useMemo(() => ({ createToast }), [createToast])}
    >
      {children}
      <ul className="absolute bottom-10 left-[50%] max-h-96 py-0 flex flex-col gap-y-2 overflow-hidden">
        {toasts?.map(({ id, message }) => {
          return (
            <li key={id}>
              <Toast id={id} onClose={onClose}>
                toast {message}
              </Toast>
            </li>
          );
        })}
      </ul>
    </ToastContext.Provider>
  );
};
