import { getAllUsers } from "@/api";
import { useEffect, useState } from "react";

export const useGetAllUsers = () => {
  const [users, setUsers] = useState<User[]>(() => []);
  const [isLoading, setIsLoading] = useState(() => false);
  const [error, setError] = useState<Error | null>(() => null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [allUsers, err] = await getAllUsers();
      if (err !== null) {
        setError(err);
        setIsLoading(false);
        setUsers([]);
        return;
      }

      setUsers(allUsers);
      setIsLoading(false);
      setError(null);
    })();
  }, []);

  return [users, isLoading, error] as const;
};
