import {
  IoAddCircleOutline,
  IoHome,
  IoSearch,
  IoWarning,
} from "react-icons/io5";
import { Button, Icon, Layout, useToast } from "./components";
import { Routes, Route, Link } from "react-router";
import { Home, Search } from "./pages";
import { useState } from "react";
import { AddModal } from "./modals";

function App() {
  // TODO: isolate me
  const [modalOpen, setModalOpen] = useState(() => false);

  return (
    <main className="w-screen h-screen bg-primary">
      <Layout>
        <section className="grid grid-flow-col grid-cols-[auto,1fr]">
          <aside className="bg-transparent text-pop px-2 py-8">
            <ul className="grid grid-flow-row gap-y-4">
              <li className="flex flex-row gap-x-2 items-center">
                <Link to="/home">
                  <Button className="bg-secondary rounded p-3">
                    <Icon title="Home" className="text-xl">
                      <IoHome />
                    </Icon>
                  </Button>
                </Link>
              </li>
              <li className="flex flex-row gap-x-2 items-center">
                <Link to="/search">
                  <Button className="bg-secondary rounded p-3">
                    <Icon title="Search" className="text-xl">
                      <IoSearch />
                    </Icon>
                  </Button>
                </Link>
              </li>
              <li className="flex flex-row gap-x-2 items-center">
                <Button
                  className="bg-secondary rounded p-3"
                  onClick={() => setModalOpen(true)}
                >
                  <Icon title="Add" className="text-xl">
                    <IoAddCircleOutline />
                  </Icon>
                </Button>
              </li>
            </ul>
          </aside>
          <section className="flex items-center justify-center p-8">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
            <AddModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          </section>
        </section>
      </Layout>
    </main>
  );
}

export default App;
