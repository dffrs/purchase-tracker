import { Button, Modal, useToast } from "@/components";
import { validateFields } from "@/util";
import { FunctionComponent } from "react";
import { UserSection } from "./section/user";
import { ProductSection } from "./section/product";
import { PaymentMethodSection } from "./section/payment";
import { DeliverySection } from "./section/delivery";
import { getDeliveryValue, getPaymentValue, getUserValues } from "./util";

type AddProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddModal: FunctionComponent<AddProps> = ({ isOpen, onClose }) => {
  const createToast = useToast();

  const onInvalid: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    validateFields(event.currentTarget);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    validateFields(form);

    const user = getUserValues(form);
    const payment = getPaymentValue(form);
    const delivery = getDeliveryValue(form);

    const payload = { user, payment, delivery };

    console.log("here", payload);

    createToast("Registering order...");
  };

  return (
    <Modal isOpen={isOpen} className="!w-[45vw]">
      <form autoComplete="off" onSubmit={onSubmit} onInvalid={onInvalid}>
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
            <Button type="submit" className="bg-pop px-4">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
