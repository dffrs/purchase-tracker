import { Button, Icon, Accordion, Autocomplete, Input } from "@/components";
import { getNumberOfDecimals } from "@/util";
import { FunctionComponent } from "react";
import { IoAdd } from "react-icons/io5";

export const ProductSection: FunctionComponent = () => {
  return (
    <>
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
    </>
  );
};
