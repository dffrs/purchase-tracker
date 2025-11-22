import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./button";
import { Icon } from "./icon";
import { IoClose } from "react-icons/io5";

const TIMEOUT = 5_000;

type ToastCtx = (message: string) => void;

const ToastContext = createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw Error("ToastContext was not found");

  return ctx;
};

type ToastProps = {
  id: number;
  onClose: (toastId: number) => void;
  timer: number;
};

const Toast: FunctionComponent<PropsWithChildren<ToastProps>> = ({
  id,
  timer,
  onClose,
  children,
}) => {
  const timerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!timerRef.current) return;

    const listener = () => onClose(id);

    timerRef.current.addEventListener("animationend", listener);

    return () => {
      timerRef.current?.removeEventListener("animationend", listener);
    };
  }, [onClose, id]);

  return (
    <span
      data-timeout={timer}
      className="bg-pop rounded-xl p-2 shadow-md flex flex-col items-start shrink-wrapper"
    >
      <span ref={timerRef} className="h-1 w-full rounded-xl shrink" />
      <span className="flex items-center">
        <Button
          id={String(id)}
          className="!shadow-none rounded-full p-0"
          onClick={() => onClose(id)}
        >
          <Icon title="Close" className="text-base">
            <IoClose />
          </Icon>
        </Button>
        <span className="max-w-[25ch] overflow-ellipsis whitespace-nowrap overflow-clip mr-4">
          {children}
        </span>
      </span>
    </span>
  );
};

type Toast = {
  id: number;
  message: string;
  timer: number;
};

export const ToastProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>(() => []);

  const createToast = useCallback((message: string) => {
    setToasts((prev) => {
      const newToast = (prev.at(-1)?.id ?? 0) + 1;

      return [
        ...prev,
        {
          id: newToast,
          message: message || newToast.toString(),
          timer: TIMEOUT,
        },
      ];
    });
  }, []);

  const onClose: ToastProps["onClose"] = useCallback((toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  return (
    <ToastContext.Provider value={createToast}>
      {children}
      <ul className="absolute bottom-10 left-[50%] max-h-96 py-0 flex flex-col gap-y-2 overflow-hidden z-50">
        {toasts?.map(({ id, message, timer }) => {
          return (
            <li key={id}>
              <Toast id={id} onClose={onClose} timer={timer}>
                toast {message}
              </Toast>
            </li>
          );
        })}
      </ul>
    </ToastContext.Provider>
  );
};
