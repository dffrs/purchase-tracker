import { useToast } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllOrders } from "@/hooks/useGetAllOrders";
import { FC, FunctionComponent, useEffect } from "react";

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
  { key: "rrpAtPurchase", title: "RRP" },
  { key: "wspAtPurchase", title: "WSP" },
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
  const [allOrders, isLoading, error] = useGetAllOrders();
  const createToast = useToast();

  useEffect(() => {
    if (error != null) createToast(error.message);
  }, [error]);

  return (
    <div className="card h-full w-full p-8 grid grid-flow-row grid-rows-[auto,1fr] gap-y-8">
      <h1 className="card-header">Orders</h1>
      <table>
        <thead>
          <tr>
            {columns.map(({ title, key }) => (
              <th key={key}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allOrders.map((orders, index) => {
            return (
              <tr key={`${index}`}>
                {columns.map(({ key, Renderer }) => (
                  <td key={`${key}-${index}-${orders[key]}`}>
                    {Renderer ? <Renderer value={orders[key]} /> : orders[key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
