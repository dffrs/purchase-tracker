import { Button, Modal, useToast } from "@/components";
import { getFormElements } from "@/util";
import { FunctionComponent } from "react";
import { UserSection } from "./section/user";
import { ProductSection } from "./section/product";
import { PaymentMethodSection } from "./section/payment";
import { DeliverySection } from "./section/delivery";

type AddProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddModal: FunctionComponent<AddProps> = ({ isOpen, onClose }) => {
  const createToast = useToast();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formElements = form.elements;

    // user
    const userElements = getFormElements<HTMLInputElement>(formElements, [
      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "streetNumber",
      "apartment",
      "city",
      "zipCode",
      "country",
    ]);

    // products
    const pName = getFormElements<HTMLInputElement>(
      form,
      "[id^='product'][id$='name']",
    );

    const pCode = getFormElements<HTMLInputElement>(
      form,
      "[id^='product'][id$='code']",
    );

    const pPrice = getFormElements<HTMLInputElement>(
      form,
      "[id^='product'][id$='price']",
    );

    [...userElements, ...pName, ...pCode, ...pPrice].forEach((element) =>
      console.log(element?.value),
    );

    createToast("Hello there");
  };

  return (
    <Modal isOpen={isOpen} className="!w-[45vw]">
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="flex flex-col gap-y-4 p-8">
          <h1 className="text-contrast">Add order</h1>

          <UserSection />
          <PaymentMethodSection />
          <DeliverySection />
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
    </Modal>
  );
};
