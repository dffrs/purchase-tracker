import { Button, Icon, Accordion, Autocomplete, Input } from "@/components";
import { getNumberOfDecimals } from "@/util";
import { FunctionComponent, useCallback, useState } from "react";
import { IoAdd, IoRemoveCircleOutline } from "react-icons/io5";

export const ProductSection: FunctionComponent = () => {
  const [products, setProducts] = useState<number[]>(() => []);

  const onCreateProduct = useCallback(() => {
    setProducts((prev) => [...prev, (prev?.at(-1) || 0) + 1]);
  }, []);

  const onRemoveProduct = useCallback((product: number) => {
    setProducts((prev) => prev.filter((p) => p !== product));
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-contrast">Add Product</p>
        <Button className="bg-pop" onClick={onCreateProduct}>
          <Icon title="Add Product" className="text-xl">
            <IoAdd />
          </Icon>
        </Button>
      </div>
      <div className="max-h-80 w-full overflow-y-auto p-2 flex flex-col gap-y-4">
        {products.map((product, index) => (
          <Accordion
            key={`product-${product}-${index}`}
            header={
              <span className="flex items-center justify-between w-full">
                <p>Product {index + 1}</p>
                <Icon title="Delete" className="text-lg mr-2">
                  <IoRemoveCircleOutline
                    onClick={() => onRemoveProduct(product)}
                  />
                </Icon>
              </span>
            }
          >
            <div
              data-testid="add-product-section"
              className="flex flex-col gap-y-4"
            >
              <Autocomplete options={[]}>
                <Input
                  label="Product Name"
                  type="text"
                  id={`product-${product}-${index}-name`}
                  placeholder="product name..."
                />
              </Autocomplete>
              <Autocomplete options={[]}>
                <Input
                  label="Code"
                  type="text"
                  id={`product-${product}-${index}-code`}
                  placeholder="product code..."
                />
              </Autocomplete>
              <Input
                label="Price €"
                type="number"
                id={`product-${product}-${index}-price`}
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
        ))}
      </div>
    </>
  );
};
