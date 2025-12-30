import { Input } from "@/components";
import { FunctionComponent } from "react";

export const DateSection: FunctionComponent = () => {
  return (
    <div className="flex items-center gap-x-3 pt-2">
      <Input
        type="checkbox"
        name="old-order-checkbox"
        id="old-order-checkbox"
        label="Old order ?"
        className="accent-pop cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-contrast"
      />
      ))
    </div>
  );
};
