import { Button, Input, Autocomplete, ACOption, Icon } from "@/components";
import { getNumberOfDecimals } from "@/util";
import { FunctionComponent, useCallback, useMemo, useRef } from "react";
import { IoAdd } from "react-icons/io5";

type AddProps = {
  onClose: () => void;
};

// TODO: get a new regex
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

  const tempAutocompleteOptions = useMemo(() => {
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
        <div className="flex flex-col gap-y-6">
          <div
            data-testid="add-user-section"
            className="grid grid-cols-2 gap-6"
          >
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
          <div className="h-1 w-full bg-primary rounded-xl" />
          <div className="flex items-center justify-between">
            <p className="text-contrast">Add Product</p>
            <Button className="bg-pop">
              <Icon title="Add Product" className="text-xl">
                <IoAdd />
              </Icon>
            </Button>
          </div>
          {/* <div */}
          {/*   data-testid="add-product-section" */}
          {/*   className="flex flex-col gap-y-4" */}
          {/* > */}
          {/*   <Autocomplete options={tempAutocompleteOptions}> */}
          {/*     <Input */}
          {/*       label="Product Name" */}
          {/*       type="text" */}
          {/*       id="product-name" */}
          {/*       placeholder="product name..." */}
          {/*     /> */}
          {/*   </Autocomplete> */}
          {/*   <Autocomplete options={tempAutocompleteOptions}> */}
          {/*     <Input */}
          {/*       label="Code" */}
          {/*       type="text" */}
          {/*       id="product-code" */}
          {/*       placeholder="product code..." */}
          {/*     /> */}
          {/*   </Autocomplete> */}
          {/*   <Input */}
          {/*     label="Price €" */}
          {/*     type="number" */}
          {/*     id="product-price" */}
          {/*     placeholder="product price..." */}
          {/*     min={0} */}
          {/*     max={1_000_000} */}
          {/*     step="0.01" */}
          {/*     onChange={(e) => { */}
          {/*       const value = e.currentTarget.value; */}
          {/*       const numberOfDigits = getNumberOfDecimals(value); */}
          {/**/}
          {/*       if (numberOfDigits > 2) */}
          {/*         e.currentTarget.value = value.slice(0, -1); */}
          {/*     }} */}
          {/*   /> */}
          {/* </div> */}
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
