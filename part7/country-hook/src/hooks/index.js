import axios from 'axios';
import { useState, useEffect } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  }
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== '') {
      getCountry();
    }
  }, [name])

  const getCountry = async () => {
    try {
      const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
      setCountry(response);
    } catch (error) {
      setCountry(null)
    }
  };

  return country
};