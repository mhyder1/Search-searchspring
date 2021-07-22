import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const SEARCH_API_URL =
    "https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=";
  //[siteId].a.searchspring.io/api/search/search.json?q=dress&resultsFormat=native&siteId=[siteId]

  const [search, setSearch] = useState("");
  const [results, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [pages, setPages] = useState([]);

  const initalisePagesArray = (total) => {
    console.log("seting pages");
    console.log(total);
    for (var i = 1; i < total; i++) {
      setPages((pages) => [...pages, i]);
      console.log(i);
    }
    console.log(pages);
  };

  const getData = (e) => {
    e.preventDefault();
    console.log("In GET data");
    const url = SEARCH_API_URL + search + "&page=" + currentPage;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.results);
        const pagination = data.pagination;
        setCurrentPage(pagination.currentPage);
        setNextPage(pagination.nextPage);
        setTotalPages(pagination.totalPages);
        setPreviousPage(pagination.previousPage);
        initalisePagesArray(pagination.totalPages);
        console.log(data);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageNumbers = () => {};
  const handleButtonClick = (buttonNumber) => {
    //update current page
    //update previous page
    //update nextPage
    //call getData again
  };

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
          <div className="pagination">
            {previousPage > 0 ? <div> Prev </div> : <div></div>}
            {pages.length > 0 ? (
              pages.map((pageNumber) => {
                return (
                  <button id={pageNumber} onClick={handleButtonClick}>
                    {pageNumber}
                  </button>
                );
              })
            ) : (
              <div> No pages </div>
            )}
            {nextPage > 0 ? <div> Next </div> : <div></div>}
          </div>
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
                  {item.msrp != null && item.msrp > item.price ? (
                    <div className="itemPrice">
                      <p id="itemPriceP">${item.price}</p>
                      <p
                        style={{
                          textDecorationLine: "line-through",
                          display: "inline",
                        }}
                      >
                        ${item.msrp}
                      </p>
                    </div>
                  ) : (
                    <div className="itemPrice">
                      <p>${item.price}</p>
                    </div>
                  )}
                </div>

                // <img src={item.thumbnailImageUrl} alt="image" />;
              ))
            ) : (
              <div>Search for something </div>
            )}
          </div>
          {/* {results.pagination} */}
        </div>
      </div>
    </div>
  );
}

export default App;
