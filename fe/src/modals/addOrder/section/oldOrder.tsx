import { Input } from "@/components";
import { FunctionComponent, useCallback, useState } from "react";

export const OldOrderSection: FunctionComponent = () => {
  const [show, setShow] = useState(() => false);

  const onClick = useCallback(() => setShow((p) => !p), []);

  return (
    <div className="flex items-center gap-x-3">
      <Input
        type="checkbox"
        name="old-order-checkbox"
        id="old-order-checkbox"
        label="Old order ?"
        className="accent-pop cursor-pointer"
        labelClassName="!flex-row-reverse gap-x-2 cursor-pointer text-contrast py-2"
        defaultChecked={show}
        onClick={onClick}
      />
      <Input
        id="old-order-datetime-local"
        name="old-order-datetime-local"
        hidden={!show}
        aria-hidden={!show}
        required={show}
        type="datetime-local"
        label=""
        className="text-pop accent-pop bg-pop animate-fadeAndMoveIn"
      />
      ))
    </div>
  );
};
