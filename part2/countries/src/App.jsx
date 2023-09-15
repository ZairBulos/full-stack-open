import { useEffect, useState } from 'react';
import { findAll } from './services/countries';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const newCountries = await findAll();
    setCountries(newCountries);
  };

  const handleFilter = (event) => {
    const value = event.target.value;

    const newFilteredCountries = countries.filter(countrie =>
      countrie.name.official.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(newFilteredCountries);
  };

  return (
    <>
      <div>
        find countries
        <input
          id="countrie"
          name="countrie"
          type="text"
          onChange={handleFilter}
        />
      </div>
      <div>
        <Countries countries={filteredCountries} setCountries={setFilteredCountries} />
      </div>
    </>
  )
}

export default App;