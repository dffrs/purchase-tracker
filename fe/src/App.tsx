import { IoAddCircleOutline, IoHome, IoSearch } from "react-icons/io5";
import { Button, Icon, Layout } from "./components";
import { Routes, Route, NavLink, NavLinkRenderProps } from "react-router";
import { Home, Search } from "./pages";
import { useState } from "react";
import { AddOrderModal } from "./modals";

const LinkclassName = ({ isActive }: NavLinkRenderProps) =>
  isActive ? "*:bg-pop *:text-primary" : "";

function App() {
  // TODO: isolate me
  const [addOrderModal, setAddOrderModal] = useState(() => false);

  return (
    <main className="bg-primary">
      <Layout>
        <section className="grid grid-flow-col grid-cols-[auto,1fr] p-6 pl-4 pt-0 gap-x-6">
          <aside className="bg-transparent text-pop">
            <ul className="grid grid-flow-row gap-y-6">
              <li className="flex flex-row gap-x-2 items-center">
                <NavLink to="/" tabIndex={-1} className={LinkclassName}>
                  <Button className="bg-secondary rounded p-3">
                    <Icon title="Home" className="text-xl">
                      <IoHome />
                    </Icon>
                  </Button>
                </NavLink>
              </li>
              <li className="flex flex-row gap-x-2 items-center">
                <NavLink to="/search" tabIndex={-1} className={LinkclassName}>
                  <Button className="bg-secondary rounded p-3">
                    <Icon title="Search" className="text-xl">
                      <IoSearch />
                    </Icon>
                  </Button>
                </NavLink>
              </li>
              <li className="flex flex-row gap-x-2 items-center">
                <Button
                  className="bg-secondary rounded p-3"
                  onClick={() => setAddOrderModal(true)}
                >
                  <Icon title="Add" className="text-xl">
                    <IoAddCircleOutline />
                  </Icon>
                </Button>
              </li>
            </ul>
          </aside>
          <section className="flex items-center justify-center">
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
              </Route>
            </Routes>
            <AddOrderModal
              isOpen={addOrderModal}
              onClose={() => setAddOrderModal(false)}
            />
          </section>
        </section>
      </Layout>
    </main>
  );
}

export default App;
