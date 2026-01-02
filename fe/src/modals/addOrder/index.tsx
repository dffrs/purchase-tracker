import { Button, Modal, useToast } from "@/components";
import { validateFields } from "@/util";
import { FunctionComponent } from "react";
import { UserSection } from "./section/user";
import { ProductSection } from "./section/product";
import { PaymentMethodSection } from "./section/payment";
import { DeliverySection } from "./section/delivery";
import {
  getDeliveryValue,
  getOldOrderValue,
  getPaymentValue,
  getProductValues,
  getUserValues,
} from "../";
import { createOrder } from "@/api";
import { OldOrderSection } from "./section/oldOrder";
import { invalidateTags } from "@/hooks";

type AddOrderProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddOrderModal: FunctionComponent<AddOrderProps> = ({
  isOpen,
  onClose,
}) => {
  const createToast = useToast();

  const onInvalid: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    validateFields(event.currentTarget);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    validateFields(form);

    try {
      const user = getUserValues(form);
      const payment = getPaymentValue(form);
      const delivery = getDeliveryValue(form);
      const products = getProductValues(form);
      const createdAt = getOldOrderValue(form);

      if (products.length === 0) {
        createToast("No products to be registred");
        return;
      }

      createToast("Registering order...");
      const [_, err] = await createOrder({
        user,
        payment,
        delivery,
        products,
        createdAt,
      });
      if (err != null) {
        createToast(err.message);
        return;
      }

      createToast("Order added");
      onClose();

      invalidateTags([
        "getAllOrdersStatsTag",
        "getAllOrdersStatsForYearTag",
        "getAllOrdersTag",
      ]);
    } catch (error) {
      console.log(error);
      createToast("Error: " + (error as Error).message);
    }
  };

  return (
    <Modal isOpen={isOpen} className="min-w-[50vw] max-w-[80vw]">
      <form autoComplete="off" onSubmit={onSubmit} onInvalid={onInvalid}>
        <div className="flex flex-col gap-y-4 p-8">
          <h1 className="text-contrast">Add order</h1>

          <UserSection />
          <PaymentMethodSection />
          <DeliverySection />
          <OldOrderSection />
          <ProductSection />

          <div className="flex justify-between">
            <Button
              className="text-pop p-3 outline outline-2 outline-pop"
              onClick={onClose}
            >
              Close
            </Button>
            <Button type="submit" className="bg-pop px-5">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
