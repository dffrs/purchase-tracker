import { IoSettingsOutline } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { Icon } from "./components";

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
      <nav className="flex items-center p-2 text-contrast px-3">
        <div className="flex flex-row gap-x-2 items-center">
          <Icon id="icon" title="Purchase Tracker">
            <RiMoneyEuroCircleLine />
          </Icon>
          <label htmlFor="icon" className="text-xs">
            Purchase Tracker
          </label>
        </div>
        <div className="flex flex-row gap-x-2 ml-auto">
          <Icon title="Settings">
            <IoSettingsOutline />
          </Icon>
        </div>
      </nav>
    </div>
  );
}

export default App;
