import { Input } from "@/components";
import { FunctionComponent } from "react";

const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Pickup" },
  { id: "shipping", label: "Shipping" },
] as const;

export const DeliverySection: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-x-3 pt-2">
      {DELIVERY_OPTIONS.map(({ id, label }) => (
        <Input
          key={id}
          type="radio"
          name="delivery"
          id={id}
          label={label}
          className="accent-contrast cursor-pointer"
          labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-pop"
        />
      ))}
    </div>
  );
};
