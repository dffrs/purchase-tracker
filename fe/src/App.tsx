import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState<any>(() => []);

  return (
    <div>
      <button
        onClick={async () => {
          const resp = fetch("http://localhost:8080/api/v1/users", {
            method: "GET",
          });
          const users = (await resp).json();

          setUsers(users);

          console.log(users);
        }}
      >
        Get all users
        {users}
      </button>
    </div>
  );
}

export default App;
