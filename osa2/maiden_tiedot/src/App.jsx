import { useState, useEffect } from "react";
import "./App.css";
import CountryService from "./services/countries.js";
import Matches from "./components/Matches";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    CountryService.getAll()
      .then((res) => setCountries(res))
      .then(console.log("Got countries:", countries));
  }, []);

  useEffect(() => {
    search();
  }, [query]);

  const search = () => {
    if (!query) return setMatches([]);

    const queryLower = query.toLocaleLowerCase();
    const r = countries.filter(
      (c) =>
        c.name.common.toLocaleLowerCase().includes(queryLower) ||
        c.name.official.toLocaleLowerCase().includes(queryLower),
    );
    console.log("Filtered matches:", r);
    setMatches(r);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Find countries:
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <Matches matches={matches} />
    </>
  );
}

export default App;
