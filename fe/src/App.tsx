import { Layout } from "./components";

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
            <ul>
              <li>button 1</li>
              <li>button 2</li>
              <li>button 3</li>
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
