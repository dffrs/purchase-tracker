import { Button, Input, Autocomplete, Icon, Accordion } from "@/components";
import { getNumberOfDecimals } from "@/util";
import { FunctionComponent, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { UserSection } from "./section/user";

type AddProps = {
  onClose: () => void;
};

export const Add: FunctionComponent<AddProps> = ({ onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const internalOnClose = () => {
    formRef.current?.reset();
    onClose();
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formElements = form.elements;
    console.log("here", formElements);
  };

  return (
    <form ref={formRef} autoComplete="off" onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-4 p-8">
        <div>
          <h1 className="text-contrast">Add order</h1>
        </div>
        <UserSection />
        <div className="flex items-center justify-between">
          <p className="text-contrast">Add Product</p>
          <Button className="bg-pop">
            <Icon title="Add Product" className="text-xl">
              <IoAdd />
            </Icon>
          </Button>
        </div>
        <Accordion title="Product 1">
          <div
            data-testid="add-product-section"
            className="flex flex-col gap-y-4"
          >
            <Autocomplete options={[]}>
              <Input
                label="Product Name"
                type="text"
                id="product-name"
                placeholder="product name..."
              />
            </Autocomplete>
            <Autocomplete options={[]}>
              <Input
                label="Code"
                type="text"
                id="product-code"
                placeholder="product code..."
              />
            </Autocomplete>
            <Input
              label="Price €"
              type="number"
              id="product-price"
              placeholder="product price..."
              min={0}
              max={1_000_000}
              step="0.01"
              onChange={(e) => {
                const value = e.currentTarget.value;
                const numberOfDigits = getNumberOfDecimals(value);

                if (numberOfDigits > 2)
                  e.currentTarget.value = value.slice(0, -1);
              }}
            />
          </div>
        </Accordion>
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
