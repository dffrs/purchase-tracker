import { Button, Icon, Accordion, Autocomplete, Input } from "@/components";
import { getNumberOfDecimals } from "@/util";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { IoAdd, IoRemoveCircleOutline } from "react-icons/io5";

type ProductProps = {};

const Product: FunctionComponent<ProductProps> = () => {
  const [rrp, setRRP] = useState<number>(0);
  const [wsp, setWSP] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    setProfit(Number((rrp - wsp).toFixed(2)));
  }, [rrp, wsp]);

  return (
    <div data-testid="add-product-section" className="flex flex-col gap-y-4">
      <div className="grid grid-cols-3 gap-4 w-full">
        <Autocomplete options={[]}>
          <Input
            label="Product Name"
            type="text"
            id={`product-name`}
            placeholder="product name..."
          />
        </Autocomplete>
        <Autocomplete options={[]}>
          <Input
            label="Code"
            type="text"
            id={`product-code`}
            placeholder="product code..."
          />
        </Autocomplete>
        <Input
          label="Quantity"
          type="text"
          id={`product-quantity`}
          placeholder="quantity..."
          min={0}
          max={1_000_000}
          step="1"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^\[\d]/g, "");
            return;
          }}
        />
        <Input
          label="RRP €"
          type="number"
          id={`product-rrp`}
          placeholder="recommended retail price..."
          min={0}
          max={1_000_000}
          step="0.01"
          defaultValue={rrp}
          onChange={(e) => {
            const value = e.currentTarget.value;
            const numberOfDigits = getNumberOfDecimals(value);

            if (numberOfDigits > 2) e.currentTarget.value = value.slice(0, -1);

            setRRP(Number(e.currentTarget.value));
          }}
        />
        <Input
          label="WSP €"
          type="number"
          id={`product-wsp`}
          placeholder="wholesale purchase price..."
          min={0}
          max={1_000_000}
          step="0.01"
          defaultValue={wsp}
          onChange={(e) => {
            const value = e.currentTarget.value;
            const numberOfDigits = getNumberOfDecimals(value);

            if (numberOfDigits > 2) e.currentTarget.value = value.slice(0, -1);

            setWSP(Number(e.currentTarget.value));
          }}
        />
        <Input
          label="Profit €"
          type="number"
          disabled
          id={`product-profit`}
          min={0}
          max={1_000_000}
          step="0.01"
          value={profit}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
};

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
            <Product />
          </Accordion>
        ))}
      </div>
    </>
  );
};
