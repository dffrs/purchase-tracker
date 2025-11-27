import { Input } from "@/components";
import { FunctionComponent } from "react";

export const DeliverySection: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-x-2 pt-2">
      <Input
        type="radio"
        name="delivery"
        id="pickup"
        label="Pickup"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
      <Input
        type="radio"
        name="delivery"
        id="shipping"
        label="Shipping"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
      />
    </div>
  );
};
