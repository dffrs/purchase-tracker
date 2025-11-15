import { Button } from "@/components";
import { getFormElements } from "@/util";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { UserSection } from "./section/user";
import { ProductSection } from "./section/product";

type AddProps = {
  isOpen: boolean;
  className?: string;
  onClose: () => void;
};

export const AddDialog: FunctionComponent<AddProps> = ({
  isOpen: open,
  className,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(() => open);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formElements = form.elements;

    // user
    const [uName, uAddress, uEmail, uPhone] = getFormElements<HTMLInputElement>(
      formElements,
      ["name", "address", "email", "phone"],
    );

    // products
    const pName = getFormElements<HTMLInputElement>(
      form,
      "[id='product-name']",
    );
  };

  // TODO: nice solution, but rethink me
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      dialogRef.current?.showModal();
      return;
    }

    dialogRef.current?.close();
    setTimeout(() => setIsVisible(false), 250);
  }, [open]);

  return (
    (open || isVisible) && (
      <dialog ref={dialogRef} className={className}>
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-4 p-8">
            <h1 className="text-contrast">Add order</h1>

            <UserSection />
            <ProductSection />

            <div className="flex justify-between">
              <Button
                className="text-pop p-3 outline outline-2 outline-pop"
                onClick={onClose}
              >
                Close
              </Button>
              <Button type="submit" className="bg-pop p-3">
                Create
              </Button>
            </div>
          </div>
        </form>
      </dialog>
    )
  );
};
