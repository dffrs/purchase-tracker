import { useState } from "react";
import { Navbar } from "./components";

type Users = {
  id: number;
  name: string;
  email: string;
  phone: number;
  created_at: string;
};

function App() {
  return (
    <div>
      <Navbar>
        <a>page 1</a>
        <a>page 2</a>
        <a>page 3</a>
        <a>page 4</a>
      </Navbar>
    </div>
  );
}

export default App;
