import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type ModalProps = {
  isOpen: boolean;
  className?: string;
};

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, className = "", children }, ref) => {
    const [isVisible, setIsVisible] = useState(() => isOpen);
    const modalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);

    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        return;
      }

      const el = modalRef.current;
      if (!el) return;

      const listener = () => setIsVisible(false);

      el.addEventListener("animationend", listener);

      return () => {
        el.removeEventListener("animationend", listener);
      };
    }, [isOpen]);

    return (
      (isOpen || isVisible) && (
        <div role="modal-wrapper" data-open={isOpen}>
          <div
            ref={modalRef}
            role="modal"
            className={`card overflow-visible shadow-2xl ${className}`}
          >
            {children}
          </div>
        </div>
      )
    );
  },
);

Modal.displayName = "Modal";
