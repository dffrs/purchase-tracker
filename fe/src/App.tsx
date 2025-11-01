import { IoHome, IoSearch } from "react-icons/io5";
import { Button, Icon, Layout } from "./components";
import { Routes, Route, Link } from "react-router";
import { Home, Search } from "./pages";

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
      <Layout>
        <section className="grid grid-flow-col grid-cols-[auto,1fr]">
          <aside className="bg-contrast text-contrast p-2">
            <ul className="grid grid-flow-row gap-y-4">
              <li className="flex flex-row gap-x-2 items-center">
                <Button className="bg-secondary rounded p-3">
                  <Link to="/home">
                    <Icon title="Home" className="text-xl">
                      <IoHome />
                    </Icon>
                  </Link>
                </Button>
              </li>
              <li className="flex flex-row gap-x-2 items-center">
                <Button className="bg-secondary rounded p-3">
                  <Link to="/search">
                    <Icon title="Search" className="text-xl">
                      <IoSearch />
                    </Icon>
                  </Link>
                </Button>
              </li>
            </ul>
          </aside>
          <section className="flex items-center justify-center">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </section>
        </section>
      </Layout>
    </main>
  );
}

export default App;
