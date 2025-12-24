import { useToast } from "@/components";
import { LoadingArea } from "@/components/loadingArea";
import { useGetAllOrders } from "@/hooks/useGetAllOrders";
import { FunctionComponent, useEffect } from "react";

const columns: { title: string; key: keyof OrderResponse }[] = [
  { key: "name", title: "User" },
  { key: "email", title: "Email" },
  { key: "phone", title: "Phone" },
  { key: "productName", title: "Product Name" },
  { key: "productCode", title: "Product Code" },
  { key: "rrpAtPurchase", title: "RRP" },
  { key: "wspAtPurchase", title: "WSP" },
  { key: "quantity", title: "Quantity" },
  { key: "orderDate", title: "Date" },
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
      <LoadingArea isLoading={isLoading}>
        <table className="w-full border-collapse text-left">
          <thead className="text-contrast">
            <tr>
              {columns.map(({ title, key }) => (
                <th className="border-2 border-solid border-pop px-6" key={key}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-pop">
            {allOrders.map((orders, index) => {
              return (
                <tr key={`${index}`}>
                  {columns.map(({ key }) => (
                    <td
                      className="border-2 border-solid border-pop px-6"
                      key={`${key}-${index}-${orders[key]}`}
                    >
                      {orders[key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </LoadingArea>
    </div>
  );
};
