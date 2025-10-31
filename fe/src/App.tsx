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
      <Layout>test</Layout>
    </main>
  );
}

export default App;
