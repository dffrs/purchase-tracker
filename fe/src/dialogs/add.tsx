import { Button } from "@/components";
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
          <span className="flex flex-col">
            <label htmlFor="name" className="text-contrast">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-transparent border-x-0 border-t-0 border-2 border-contrast text-pop transition-transform focus:outline-none focus:scale-105 placeholder:text-contrast placeholder:opacity-50 placeholder:text-sm placeholder:italic"
              placeholder="user's name"
            />
          </span>
          <span className="flex flex-col">
            <label htmlFor="email" className="text-contrast">
              Email
            </label>
            <input
              type="email"
              id="email"
              pattern={String(EMAIL_VALIDATION)}
              className="bg-transparent border-x-0 border-t-0 border-2 border-contrast text-pop transition-transform focus:outline-none focus:scale-105"
            />
          </span>
          <span className="flex flex-col">
            <label htmlFor="phone" className="text-contrast">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-transparent border-x-0 border-t-0 border-2 border-contrast text-pop transition-transform focus:outline-none focus:scale-105"
              pattern={String(PT_PHONE_NUMBER)}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^\d|\+]/g, "");
                return;
              }}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <Button
            className="text-contrast p-3 outline outline-2 outline-contrast"
            onClick={internalOnClose}
          >
            Close
          </Button>
          <Button type="submit" className="bg-contrast p-3">
            Create
          </Button>
        </div>
      </div>
    </form>
  );
};
