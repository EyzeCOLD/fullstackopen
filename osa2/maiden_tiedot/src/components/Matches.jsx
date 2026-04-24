import { useState, useEffect } from "react";
import Weather from "./Weather";

const Matches = ({ matches }) => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    if (show !== null) setShow(null);
  }, [matches]);

  if (matches.length === 1) {
    return <Country country={matches[0]} />;
  }

  if (show !== null) {
    return <Country country={show} />;
  }

  if (!matches.length) {
    return <h3>No matches</h3>;
  }

  if (matches.length <= 10) {
    return (
      <>
        <h2>Results</h2>
        <CountryList
          matches={matches}
          showCountry={(country) => setShow(country)}
        />
      </>
    );
  }

  return <h3>Too many matches ({matches.length}), specify another filter</h3>;
};

const CountryList = ({ matches, showCountry }) => {
  return (
    <table>
      <tbody>
        {matches.map((r) => {
          return (
            <tr key={r.cca3}>
              <td>
                {r.name.common} | <em>{r.name.official}</em>{" "}
                <button onClick={() => showCountry(r)}>Show</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Country = ({ country }) => {
  return (
    <>
      <h1>
        {country.flag} {country.name.common}
      </h1>
      <em>{country.name.official}</em>
      <p>-</p>
      <p>
        Capital: <strong>{country.capital}</strong>
      </p>
      <p>
        Area: <strong>{country.area} km²</strong>
      </p>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <Weather country={country} />
    </>
  );
};

const Languages = ({ languages }) => {
  return (
    <table>
      <tbody>
        {Object.values(languages).map((l) => (
          <tr key={l}>
            <td>{l}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Matches;
