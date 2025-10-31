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
            <p>hello there</p>
            <p>hello there</p>
            <p>hello there</p>
            <p>hello there</p>
          </aside>
          test
        </section>
      </Layout>
    </main>
  );
}

export default App;
