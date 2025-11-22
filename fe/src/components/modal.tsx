import { forwardRef, PropsWithChildren, useEffect, useState } from "react";

const DEL_FROM_DOM_TIMEOUT = 250; //ms

type ModalProps = {
  isOpen: boolean;
  className?: string;
};

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, className = "", children }, ref) => {
    const [isVisible, setIsVisible] = useState(() => isOpen);

    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        return;
      }

      setTimeout(() => setIsVisible(false), DEL_FROM_DOM_TIMEOUT);
    }, [isOpen]);

    return (
      (isOpen || isVisible) && (
        <div role="modal-wrapper" data-open={isOpen}>
          <div
            ref={ref}
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
