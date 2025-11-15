import { ACOption, Autocomplete, Input } from "@/components";
import { FunctionComponent, useCallback, useMemo, useRef } from "react";

const EMAIL_VALIDATION =
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

const PT_PHONE_NUMBER = /^(\+351)?\d{9}$/g;

export const UserSection: FunctionComponent = () => {
  const nameRef = useRef<HTMLInputElement>(null);

  const onAutoCompleteName: ACOption["onClick"] = useCallback((event) => {
    if (!nameRef.current) return;
    const value = event.currentTarget.id;

    nameRef.current.value = value;
  }, []);

  const tempAutocompleteOptions = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      text: "option " + (i + 1),
      onClick: onAutoCompleteName,
    }));
  }, [onAutoCompleteName]);

  return (
    <div data-testid="add-user-section" className="grid grid-cols-2 gap-6">
      <Autocomplete options={tempAutocompleteOptions}>
        <Input
          ref={nameRef}
          label="User Name"
          type="text"
          id="name"
          placeholder="user's name..."
        />
      </Autocomplete>
      <Autocomplete options={tempAutocompleteOptions}>
        <Input
          label="Address"
          type="text"
          id="address"
          placeholder="user's address..."
        />
      </Autocomplete>
      <Autocomplete options={tempAutocompleteOptions}>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="user's email..."
          pattern={String(EMAIL_VALIDATION)}
        />
      </Autocomplete>
      <Autocomplete options={tempAutocompleteOptions}>
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
      </Autocomplete>
    </div>
  );
};
