import { Icon, Input, useToast } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllOrders } from "@/hooks/useGetAllOrders";
import { FC, FunctionComponent, useCallback, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

const columns: {
  title: string;
  key: keyof OrderResponse;
  Renderer?: FC<{ value: unknown }>;
}[] = [
  { key: "name", title: "User" },
  { key: "email", title: "Email" },
  { key: "phone", title: "Phone" },
  { key: "productName", title: "Product Name" },
  { key: "productCode", title: "Product Code" },
  { key: "rrpAtPurchase", title: "RRP €" },
  { key: "wspAtPurchase", title: "WSP €" },
  { key: "quantity", title: "Quantity" },
  {
    key: "orderDate",
    title: "Date",
    Renderer: ({ value }) =>
      new Intl.DateTimeFormat(undefined, {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(String(value))),
  },
];

export const Search: FunctionComponent = () => {
  const [orders, onSearch, isLoading, error] = useGetAllOrders();
  const createToast = useToast();

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      if (ev.key !== "Enter") return;
      onSearch(ev.currentTarget.value);
    },
    [onSearch],
  );

  useEffect(() => {
    if (error != null) createToast(error.message);
  }, [error]);

  return (
    <div className="card h-full w-full p-8 grid grid-flow-row grid-rows-[auto,1fr] gap-y-8 overflow-hidden">
      <span className="flex justify-between">
        <h1 className="card-header">Orders</h1>
        <span className="flex gap-x-3 items-center">
          <Icon title="Search" className="cursor-auto hover:scale-100">
            <IoSearch className="text-pop text-2xl mt-2"></IoSearch>
          </Icon>
          <Input
            type="search"
            label=""
            placeholder="Press Enter to search"
            onKeyDown={onKeyDown}
          />
        </span>
      </span>
      <LoadingArea isLoading={isLoading} className="overflow-auto">
        <table className="max-h-[75vh]">
          <thead>
            <tr>
              {columns.map(({ title, key }) => (
                <th key={key}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((orders, index) => (
              <tr key={`${index}`}>
                {columns.map(({ key, Renderer }) => (
                  <td key={`${key}-${index}-${orders[key]}`}>
                    {Renderer ? <Renderer value={orders[key]} /> : orders[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </LoadingArea>
    </div>
  );
};
