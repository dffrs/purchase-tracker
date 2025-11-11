import { Button, Input, Autocomplete, ACOption } from "@/components";
import { FunctionComponent, useCallback, useMemo, useRef } from "react";

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

  // test
  const nameRef = useRef<HTMLInputElement>(null);

  const onAutoCompleteName: ACOption["onClick"] = useCallback((event) => {
    if (!nameRef.current) return;
    const value = event.currentTarget.id;

    nameRef.current.value = value;
  }, []);

  const nameAutocomplete = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      text: "option " + (i + 1),
      onClick: onAutoCompleteName,
    }));
  }, [onAutoCompleteName]);

  return (
    <form ref={formRef} autoComplete="off">
      <div className="flex flex-col gap-y-4 p-8">
        <div>
          <h1 className="text-contrast">Add order</h1>
        </div>
        <div data-testid="add-user-section" className="flex flex-col gap-y-4">
          <Autocomplete options={nameAutocomplete}>
            <Input
              ref={nameRef}
              label="Name"
              type="text"
              id="name"
              placeholder="user's name..."
            />
          </Autocomplete>
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
            maxLength={13}
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
