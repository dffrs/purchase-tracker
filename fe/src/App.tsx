import { Button, Layout } from "./components";

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
          <aside className="bg-contrast text-primary p-2">
            <ul className="flex flex-col gap-y-2">
              <li>
                <Button>button 1</Button>
              </li>
              <li>
                <Button>button 2</Button>
              </li>
              <li>
                <Button>button 3</Button>
              </li>
            </ul>
          </aside>
          <section className="flex items-center justify-center">
            <p>test</p>
          </section>
        </section>
      </Layout>
    </main>
  );
}

export default App;
