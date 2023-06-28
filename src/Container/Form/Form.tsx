import React, { useState } from "react";
import "./form.scss";

type Currency = "USD" | "EUR" | "UAH" | "PLN";

const currencyRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.85,
  UAH: 27.5,
  PLN: 3.8,
};

const products = [
  { name: "iPhone 8", basePrice: 750, description: "This is iPhone 8" },
  { name: "iPhone 10", basePrice: 850, description: "This is iPhone X" },
  { name: "iPhone 12", basePrice: 1250, description: "This is iPhone 12" },
];

const Form = () => {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleCurrencyChange = (selectedCurrency: Currency) => {
    const convertedTotalPrice =
      (totalPrice / currencyRates[currency]) * currencyRates[selectedCurrency];
    setCurrency(selectedCurrency);
    setTotalPrice(convertedTotalPrice);
  };

  const handleProductClick = (basePrice: number) => {
    const convertedPrice = basePrice * currencyRates[currency];
    setTotalCount((prevCount) => prevCount + 1);
    setTotalPrice((prevPrice) => prevPrice + convertedPrice);
  };

  return (
    <div className="form-container">
      <h2>Our shop page</h2>
      <div className="currency-buttons">
        <button onClick={() => handleCurrencyChange("USD")}>USD</button>
        <button onClick={() => handleCurrencyChange("EUR")}>EUR</button>
        <button onClick={() => handleCurrencyChange("UAH")}>UAH</button>
        <button onClick={() => handleCurrencyChange("PLN")}>PLN</button>
      </div>
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              Price: {product.basePrice * currencyRates[currency]} {currency}
            </p>
            <button onClick={() => handleProductClick(product.basePrice)}>
              Buy
            </button>
          </div>
        ))}
      </div>
      <div className="total">
        Total Count: {totalCount} | Total Price: {totalPrice} {currency}
      </div>
    </div>
  );
};

export default Form;
