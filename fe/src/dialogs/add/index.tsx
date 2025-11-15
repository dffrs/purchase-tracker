import { Button } from "@/components";
import { getFormElements } from "@/util";
import { FunctionComponent, useRef } from "react";
import { UserSection } from "./section/user";
import { ProductSection } from "./section/product";

type AddProps = {
  onClose: () => void;
};

export const Add: FunctionComponent<AddProps> = ({ onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const internalOnClose = () => {
    formRef.current?.reset();
    onClose();
  };

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
    const pName = getFormElements<HTMLFormElement>(form, "[id='product-name']");
  };

  return (
    <form ref={formRef} autoComplete="off" onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-4 p-8">
        <h1 className="text-contrast">Add order</h1>

        <UserSection />
        <ProductSection />

        <div className="flex justify-between">
          <Button
            className="text-pop p-3 outline outline-2 outline-pop"
            onClick={internalOnClose}
          >
            Close
          </Button>
          <Button type="submit" className="bg-pop p-3">
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};
