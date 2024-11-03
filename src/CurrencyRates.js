import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);
  const API_KEY = '445deb2bb62b4f5bb2d2ebdcee5949c1';
  const BASE_CURRENCY = 'USD';

  useEffect(() => {
    const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&base=${BASE_CURRENCY}`
        );
        const fetchedRates = response.data.rates;

        const currencyData = currencies.map(currency => ({
          currency,
          weBuy: parseFloat((fetchedRates[currency] * 1.05).toFixed(4)),
          exchangeRate: parseFloat(fetchedRates[currency]).toFixed(6),
          weSell: parseFloat((fetchedRates[currency] * 0.95).toFixed(4)),
        }));

        setRates(currencyData);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="currency-rates">
      <h1>Currency Exchange Rates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(rate => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based on 1 USD</p>
      <p>This application uses API data from <a href="https://currencyfreaks.com" target="_blank" rel="noopener noreferrer">currencyfreaks.com</a>.</p>
    </div>
  );
};

export default CurrencyRates;
