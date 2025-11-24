import { Input } from "@/components";
import { FunctionComponent } from "react";

export const PaymentMethodSection: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Input
        type="radio"
        name="payment"
        id="mbway"
        label="MBWay"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
      <Input
        type="radio"
        name="payment"
        id="cash"
        label="Cash"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
      <Input
        type="radio"
        name="payment"
        id="card"
        label="Card"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
      <Input
        type="radio"
        name="payment"
        id="paypal"
        label="Paypal"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
      <Input
        type="radio"
        name="payment"
        id="other"
        label="Other"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
    </div>
  );
};
