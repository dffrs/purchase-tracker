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
    <main className="w-screen h-screen bg-primary">
      <div>
        <Navbar />
      </div>
    </main>
  );
}

export default App;
