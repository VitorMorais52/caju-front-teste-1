import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "@/router";

import { Header } from "./components/Header";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>

      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
