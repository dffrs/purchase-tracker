import { getAllUsers } from "@/api";
import { useEffect, useState } from "react";

export const useGetAllUsers = (): [User[], boolean] => {
  const [users, setUsers] = useState<User[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const allUsers = await getAllUsers();

      setUsers(allUsers ?? []);
      setIsLoading(false);
    })();
  }, []);

  return [users, isLoading];
};
