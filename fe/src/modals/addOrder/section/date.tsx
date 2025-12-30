import { Input } from "@/components";
import { FunctionComponent, useState } from "react";

export const DateSection: FunctionComponent = () => {
  const [show, setShow] = useState(() => false);

  return (
    <div className="flex items-center gap-x-3 pt-2">
      <Input
        type="checkbox"
        name="old-order-checkbox"
        id="old-order-checkbox"
        label="Old order ?"
        className="accent-pop cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-contrast"
        checked={show}
        onClick={() => {
          setShow((p) => !p);
        }}
      />
      <Input
        hidden={!show}
        aria-hidden={!show}
        required={show}
        type="datetime-local"
        step={1}
        label=""
        className="text-pop accent-pop bg-pop"
      />
      ))
    </div>
  );
};
