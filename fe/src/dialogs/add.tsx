import { Button } from "@/components";
import { Input } from "@/components/inputs/base";
import { FunctionComponent, useRef } from "react";

type AddProps = {
  onClose: () => void;
};

const EMAIL_VALIDATION =
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;
const PT_PHONE_NUMBER = /^(\+351)?\d{9}$/g;

export const Add: FunctionComponent<AddProps> = ({ onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const internalOnClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <form ref={formRef} autoComplete="off">
      <div className="flex flex-col gap-y-4 p-8">
        <div>
          <h1 className="text-contrast">Add order</h1>
        </div>
        <div data-testid="add-user-section" className="flex flex-col gap-y-4">
          <Input
            label="Name"
            type="text"
            id="name"
            placeholder="user's name..."
          />
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="user's email..."
            pattern={String(EMAIL_VALIDATION)}
          />
          <Input
            label="Phone"
            type="tel"
            id="phone"
            placeholder="user's phone number..."
            pattern={String(PT_PHONE_NUMBER)}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^\d|\+]/g, "");
              return;
            }}
          />
        </div>
        <div className="flex justify-between">
          <Button
            className="text-pop p-3 outline outline-2 outline-pop"
            onClick={internalOnClose}
          >
            Close
          </Button>
          <Button type="submit" className="bg-pop p-3">
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};
