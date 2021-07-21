import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const SEARCH_API_URL =
    "https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=";
  //[siteId].a.searchspring.io/api/search/search.json?q=dress&resultsFormat=native&siteId=[siteId]

  const [search, setSearch] = useState("");
  const [results, setResult] = useState(null);

  const getData = (e) => {
    e.preventDefault();
    console.log("In GET data");
    const url = SEARCH_API_URL + search;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.results);
        setResult(data.results);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageNumbers = () => {};

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Searchspring fashion</h1>
        <form action="" className="form" onSubmit={getData}>
          <label htmlFor="label" className="label">
            Searchspring fashion:
          </label>
          <input
            type="text"
            name="text"
            placeholder="Search for Brand, Color, Size..."
            className="input"
            onChange={handleChange}
            value={search}
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
        <div>
          <div className="resultsDisplay">
            {/* {results != null ? results.length : "no"} */}
            {results != null ? (
              results.map((item) => (
                <div className="itemRow" key={item.id}>
                  <div className="itemImage">
                    <img src={item.thumbnailImageUrl} alt="product" />
                  </div>
                  <div className="itemName">
                    <p>{item.name}</p>
                  </div>
                  <div className="itemPrice">
                    {/* {item.msrp && item.msrp * 1 > item.price * 1 
                      ? item.price
                      : item.msrp} */}
                    <p>${item.price}</p>
                    <p style={{ textDecorationLine: "line-through" }}>
                      ${item.msrp}
                    </p>
                  </div>
                </div>

                // <img src={item.thumbnailImageUrl} alt="image" />;
              ))
            ) : (
              <div>Search for something </div>
            )}
          </div>
          {results.pagination}
        </div>
      </div>
    </div>
  );
}

export default App;
