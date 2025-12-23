import { Input } from "@/components";
import { FunctionComponent } from "react";

const PAYMENT_OPTIONS = [
  { id: "mbway", label: "MBWay" },
  { id: "cash", label: "Cash" },
  { id: "card", label: "Card" },
  { id: "paypal", label: "Paypal" },
  { id: "other", label: "Other" },
] as const;

export const PaymentMethodSection: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-x-2 pt-2">
      {PAYMENT_OPTIONS.map(({ id, label }) => (
        <Input
          key={id}
          type="radio"
          name="payment"
          id={id}
          label={label}
          className="accent-pop cursor-pointer"
          labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-contrast"
        />
      ))}
    </div>
  );
};
