import { ACOption, Autocomplete, Input } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllUsers } from "@/hooks";
import { FunctionComponent, useCallback, useMemo, useRef } from "react";

const EMAIL_VALIDATION =
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

const PT_PHONE_NUMBER = /^(\+351)?\d{9|13}$/g;

export const UserSection: FunctionComponent = () => {
  const [users, isLoading] = useGetAllUsers();

  // user name
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  // user info
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // user address
  const streetRef = useRef<HTMLInputElement>(null);
  const streetNumberRef = useRef<HTMLInputElement>(null);
  const apartmentRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const onAutoComplete = useCallback(
    (event: Parameters<ACOption["onClick"]>[0], prop: keyof User) => {
      if (!firstNameRef.current) return;
      if (!lastNameRef.current) return;
      if (!emailRef.current) return;
      if (!phoneRef.current) return;
      if (!streetRef.current) return;
      if (!streetNumberRef.current) return;
      if (!apartmentRef.current) return;
      if (!cityRef.current) return;
      if (!zipCodeRef.current) return;
      if (!countryRef.current) return;

      const value = event.currentTarget.id;

      const user = users.find((user) => String(user[prop]) === String(value));
      if (!user) return;

      const [firstName, ...lastName] = user.name.split(" ");

      // user name
      firstNameRef.current.value = firstName;
      lastNameRef.current.value = lastName.join(" ");

      // user info
      emailRef.current.value = user.email;
      phoneRef.current.value = String(user.phone);

      // user address
      streetRef.current.value = user.address?.street ?? "";
      streetNumberRef.current.value = user.address?.streetNumber ?? "";
      apartmentRef.current.value = user.address?.apartment ?? "";
      cityRef.current.value = user.address?.city?.name ?? "";
      zipCodeRef.current.value = user.address?.city?.zipCode ?? "";
      countryRef.current.value = user.address?.city?.country?.name ?? "";
    },
    [users],
  );

  const userNameAutoComplete: ACOption[] = useMemo(() => {
    return users.map((user) => ({
      text: user.name,
      onClick: (event) => onAutoComplete(event, "name"),
    }));
  }, [users, onAutoComplete]);

  const userEmailAutoComplete: ACOption[] = useMemo(() => {
    return users.map((user) => ({
      text: user.email,
      onClick: (event) => onAutoComplete(event, "email"),
    }));
  }, [users, onAutoComplete]);

  const userPhoneAutoComplete: ACOption[] = useMemo(() => {
    return users.map((user) => ({
      text: String(user.phone),
      onClick: (event) => onAutoComplete(event, "phone"),
    }));
  }, [users, onAutoComplete]);

  return (
    <LoadingArea isLoading={isLoading}>
      <div data-testid="add-user-section" className="grid grid-cols-2 gap-6">
        <Autocomplete options={userNameAutoComplete}>
          <Input
            ref={firstNameRef}
            label="First Name"
            type="text"
            id="name"
            placeholder="e.g., Raquel"
          />
        </Autocomplete>
        <Autocomplete options={userNameAutoComplete}>
          <Input
            ref={lastNameRef}
            label="Last Name"
            type="text"
            id="name"
            placeholder="e.g., Canhoto"
          />
        </Autocomplete>
        <Autocomplete options={userEmailAutoComplete}>
          <Input
            ref={emailRef}
            label="Email"
            type="email"
            id="email"
            placeholder="e.g., rc@gmail.com"
            pattern={String(EMAIL_VALIDATION)}
          />
        </Autocomplete>
        <Autocomplete options={userPhoneAutoComplete}>
          <Input
            ref={phoneRef}
            label="Phone"
            type="tel"
            id="phone"
            placeholder="e.g., +351 912 345 678"
            maxLength={13}
            pattern={String(PT_PHONE_NUMBER)}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^\d|\+]/g, "");
              return;
            }}
          />
        </Autocomplete>
        <Autocomplete options={[]}>
          <Input
            ref={streetRef}
            label="Street"
            type="text"
            id="street"
            placeholder="e.g., Avenida da Liberdade"
          />
        </Autocomplete>
        <div className="flex items-center justify-between">
          <Autocomplete options={[]}>
            <Input
              ref={streetNumberRef}
              label="Street Number"
              type="text"
              id="streetNumber"
              placeholder="e.g., 245"
            />
          </Autocomplete>
          <Autocomplete options={[]}>
            <Input
              ref={apartmentRef}
              label="Apartment, Suite, etc."
              type="text"
              id="apartment"
              placeholder="e.g., Apt 3B (optional)"
            />
          </Autocomplete>
        </div>
        <div className="flex items-center justify-between">
          <Autocomplete options={[]}>
            <Input
              ref={cityRef}
              label="City"
              type="text"
              id="city"
              placeholder="e.g., Lisbon"
            />
          </Autocomplete>
          <Autocomplete options={[]}>
            <Input
              ref={zipCodeRef}
              label="Zip Code"
              type="text"
              id="zipCode"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^\d|\-]/g, "");
                return;
              }}
              placeholder="e.g., 1000-001"
            />
          </Autocomplete>
        </div>
        <Autocomplete options={[]}>
          <Input
            ref={countryRef}
            label="Country"
            type="text"
            id="country"
            defaultValue="Portugal"
            placeholder="e.g., Portugal"
          />
        </Autocomplete>
      </div>
    </LoadingArea>
  );
};
