import { useState, useEffect } from 'react';
import DisplayedData from './DisplayedData';
import './App.css';

function App() {
  const currs = ["usd", "eur", "aud", "cad", "chf", "nzd", "bgn"];
  const [isPending, setIsPending] = useState(true);
  const [errorM, setErrorM] = useState("");
  const [selectedOption, setSelectedOption] = useState("usd");
  let currencyRates= {};

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + selectedOption + ".json")
      .then(res => {
        if (!res.ok) {
          setIsPending(false);
          setErrorM("Could not peform the current fetch request.");
          throw new Error ("Could not peform the current fetch request.")
        }
        return res.json();
      })
      .then(data => {
        currs.forEach(curr => {
          currencyRates[curr] = data[selectedOption][curr];
        })

        setIsPending(false);

        console.log(JSON.stringify(currencyRates));
      })
      .catch(err => {
        setIsPending(false);
        setErrorM(err.message);
      })
  });

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="currency">Currency options to choose from:</label>
        <select name="currency" id="currency" defaultValue="usd" onChange={handleChange}>
          {currs.map(curr => {
            return(
              <option value={curr} key={curr}>{curr.toUpperCase()}</option>
            )
          })}
        </select>
      </form>
      {isPending && <section>Loading...</section>}
      {errorM && <section>{ errorM }</section>}
      <DisplayedData selectedOption={selectedOption} currencyRates={currencyRates} />
    </div>
  );
}

export default App;
