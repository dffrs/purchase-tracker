import { Button, Input, Modal, useToast } from "@/components";
import { EMAIL_VALIDATION, PT_PHONE_NUMBER, validateFields } from "@/util";
import { FunctionComponent } from "react";
import { getUserValues } from "../addOrder/util";

type AddUserProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddUserModal: FunctionComponent<AddUserProps> = ({
  isOpen,
  onClose,
}) => {
  const createToast = useToast();

  const onInvalid: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    validateFields(event.currentTarget);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    validateFields(form);

    const user = getUserValues(form);

    const payload = { user };

    console.log("here", payload);

    createToast("Registering user...");
  };

  return (
    <Modal isOpen={isOpen} className="!w-[45vw]">
      <form autoComplete="off" onSubmit={onSubmit} onInvalid={onInvalid}>
        <div className="flex flex-col gap-y-4 p-8">
          <h1 className="text-contrast">Add User</h1>
          <div
            data-testid="add-user-section"
            className="grid grid-cols-2 gap-6"
          >
            <Input
              required
              label="First Name *"
              type="text"
              id="firstName"
              placeholder="e.g., Raquel"
            />
            <Input
              required
              label="Last Name *"
              type="text"
              id="lastName"
              placeholder="e.g., Canhoto"
            />
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="e.g., rc@gmail.com"
              pattern={String(EMAIL_VALIDATION)}
            />
            <Input
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
            <Input
              label="Street"
              type="text"
              id="street"
              placeholder="e.g., Avenida da Liberdade"
            />
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Street Number"
                type="text"
                id="streetNumber"
                placeholder="e.g., 245"
              />
              <Input
                label="Apartment, Suite, etc."
                type="text"
                id="apartment"
                placeholder="e.g., Apt 3B (optional)"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="City"
                type="text"
                id="city"
                placeholder="e.g., Lisbon"
              />
              <Input
                label="Zip Code"
                type="text"
                id="zipCode"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^\d|\-]/g, "");
                  return;
                }}
                placeholder="e.g., 1000-001"
              />
            </div>
            <Input
              label="Country"
              type="text"
              id="country"
              defaultValue="Portugal"
              placeholder="e.g., Portugal"
            />
          </div>

          <div className="flex justify-between">
            <Button
              className="text-pop p-3 outline outline-2 outline-pop"
              onClick={onClose}
            >
              Close
            </Button>
            <Button type="submit" className="bg-pop px-5">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
