import { ACOption, Autocomplete, Input } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllUsers } from "@/hooks";
import { FunctionComponent, useCallback, useMemo, useRef } from "react";

const EMAIL_VALIDATION =
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

const PT_PHONE_NUMBER = /^(\+351)?\d{9|13}$/g;

export const UserSection: FunctionComponent = () => {
  const [users, isLoading] = useGetAllUsers();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // TODO: fix any
  const onAutoComplete = useCallback(
    (event: any, prop: keyof User) => {
      if (!nameRef.current) return;
      if (!emailRef.current) return;
      if (!phoneRef.current) return;

      const value = event.currentTarget.id;

      const user = users.find((user) => String(user[prop]) === String(value));
      if (!user) return;

      nameRef.current.value = user.name;
      emailRef.current.value = user.email;
      phoneRef.current.value = String(user.phone);
    },
    [users],
  );

  const userNameAutoComplete = useMemo(() => {
    return users.map((user) => ({
      text: user.name,
      onClick: (event: any) => onAutoComplete(event, "name"),
    }));
  }, [users, onAutoComplete]);

  const userEmailAutoComplete = useMemo(() => {
    return users.map((user) => ({
      text: user.email,
      onClick: (event: any) => onAutoComplete(event, "email"),
    }));
  }, [users, onAutoComplete]);

  const userPhoneAutoComplete = useMemo(() => {
    return users.map((user) => ({
      text: String(user.phone),
      onClick: (event: any) => onAutoComplete(event, "phone"),
    }));
  }, [users, onAutoComplete]);

  return (
    <LoadingArea isLoading={isLoading}>
      <div data-testid="add-user-section" className="grid grid-cols-2 gap-6">
        <Autocomplete options={userNameAutoComplete}>
          <Input
            ref={nameRef}
            label="User Name"
            type="text"
            id="name"
            placeholder="user's name..."
          />
        </Autocomplete>
        <Autocomplete options={[]}>
          <Input
            label="Address"
            type="text"
            id="address"
            placeholder="user's address..."
          />
        </Autocomplete>
        <Autocomplete options={userEmailAutoComplete}>
          <Input
            ref={emailRef}
            label="Email"
            type="email"
            id="email"
            placeholder="user's email..."
            pattern={String(EMAIL_VALIDATION)}
          />
        </Autocomplete>
        <Autocomplete options={userPhoneAutoComplete}>
          <Input
            ref={phoneRef}
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
    </LoadingArea>
  );
};
