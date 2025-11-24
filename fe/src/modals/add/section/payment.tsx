import { Input } from "@/components";
import { FunctionComponent } from "react";

export const PaymentMethodSection: FunctionComponent = () => {
  return (
    <div className="flex text-contrast">
      <Input
        type="checkbox"
        label="MBWay"
        className="accent-contrast cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer"
      />
    </div>
  );
};
