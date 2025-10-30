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
      <nav className="flex items-center p-2 bg-white text-black">
        <div className="flex flex-row gap-x-2">
          <p id="icon">icon here</p>
          <label htmlFor="icon">label here</label>
        </div>
        <div className="flex flex-row gap-x-2 ml-auto">
          <p id="settings">settings here</p>
        </div>
      </nav>
    </div>
  );
}

export default App;
