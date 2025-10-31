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
    <>
      <Navbar />
    </>
  );
}

export default App;
