import { useState } from "react";

type Users = {
  id: number;
  name: string;
  email: string;
  phone: number;
  created_at: string;
};

function App() {
  const [users, setUsers] = useState<Users[]>(() => []);

  return (
    <div>
      <button
        onClick={async () => {
          const resp = await fetch("http://localhost:8080/api/v1/users", {
            method: "GET",
          });
          const users = await resp.json();
          setUsers(users);
        }}
      >
        Get all users
      </button>
      <ul className="flex flex-col items-start gap-2">
        {users.map(({ id, name, email, phone, created_at }) => (
          <li
            key={id}
            className="flex flex-rows gap-1 items-center justify-between"
          >
            <span>{name}</span>
            <span>{email}</span>
            <span>{phone}</span>
            <span>{created_at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
