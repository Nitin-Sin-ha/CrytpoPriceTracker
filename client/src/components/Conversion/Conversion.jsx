import React, { useState, useEffect } from "react";
import axios from "axios";
import "./conversion.css";

const Conversion = () => {
  const [currency, setCurrency] = useState("USD");
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState();
  const [symbols, setSymbol] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    axios.get("http://localhost:5001/allSymbols").then((response) => {
      setSymbol(response.data);
    });
    axios.get("http://localhost:5001/allCurrency").then((response) => {
      setCurrencies(response.data);
    });
  }, []);

  const currencyHandler = (event) => {
    if (event.target.value === "") {
      setCurrency("USD");
    } else {
      setCurrency(event.target.value);
    }
    console.log(event.target.value);
  };

  const crytpoHandler = (event) => {
    setCrypto(event.target.value);
    console.log(event.target.value);
  };

  const amountHandler = (event) => {
    setAmount(event.target.value);
    console.log(event.target.value);
  };
  useEffect(
    function totalAmountHandler() {
      if (!crypto || !amount || !currency) {
        return;
      }
      try {
        axios
          .get(
            `http://localhost:5001/exchangeRate/${crypto}/${currency}/${amount}`
          )
          .then((response) => {
            setTotalAmount(response.data.TotalValue);
          });
        console.log(
          `http://localhost:5001/exchangeRate/${crypto}/${currency}/${amount}`
        );
      } catch (error) {
        console.error(error);
      }
    },
    [crypto, amount, currency]
  );

  return (
    <div className="wrapper">
      <div className="amountCalculator">Price Calculator</div>
      <div className="feild">
        <div className="amount">
          <input
            type="number"
            placeholder="Enter Amount"
            onChange={amountHandler}
            className="drop1"
          />
        </div>
        <div className="crypto">
          <select onChange={crytpoHandler} className="drop2">
            <option>Please choose one option</option>
            {symbols.map((symbol, index) => {
              return <option key={index}>{symbol.name}</option>;
            })}
          </select>
        </div>
        <div className="currency">
          <select onChange={currencyHandler} className="drop3">
            {<option>{currency}</option>}
            {currencies.map((symbol, index) => {
              return symbol.name === currency ? null : (
                <option key={index}>{symbol.name}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="totalamt">
        {amount < 0 || !totalAmount
          ? "Put a valid amount to calculate"
          : `${amount} ${crypto} in ${currency} is ${totalAmount}`}
      </div>
    </div>
  );
};

export default Conversion;
