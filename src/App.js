import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

function Pokemons() {
  const queryInfo = useQuery(
    "pokemons",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      return result.data.results;
    },
    {
      cacheTime: 3000,
    }
  );

  return (
    <>
      {queryInfo.isLoading ? (
        "Loading..."
      ) : queryInfo.isError ? (
        queryInfo.error
      ) : (
        <>
          {queryInfo.data?.map((pokemon) => (
            <h4>{pokemon.name}</h4>
          ))}
          <br />
          {queryInfo.isFetching ? "Updating..." : null}
        </>
      )}
    </>
  );
}

const queryClient = new QueryClient();

function App() {
  const [isVisible, setVisible] = useState(true);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <input
          type="button"
          id="btnShow"
          value="Show"
          onClick={() => setVisible(!isVisible)}
        />
        {isVisible ? <Pokemons /> : null}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
