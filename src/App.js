import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const SEARCH_API_URL =
    "https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=";
  //[siteId].a.searchspring.io/api/search/search.json?q=dress&resultsFormat=native&siteId=[siteId]

  const [search, setSearch] = useState("");
  const [results, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [pages, setPages] = useState([]);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [search2, setSearch2] = useState("");

  // s

  const getData = () => {
    // e.preventDefault();
    // console.log("In GET data");
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
        // initalisePagesArray(pagination.totalPages);
        console.log(data);
      });
  };

  const handleChange = (e) => {
    setSearch2(e.target.value);
  };

  const handleButtonClick = (buttonNumber) => {
    setCurrentPage(buttonNumber);
    //update current page
    //update previous page
    //update nextPage
    //call getData again
  };

  useEffect(() => {
    getData();
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const isPageSeen = (pageNumber) => {
    if (currentPage + 5 > pageNumber && currentPage - 5 < pageNumber) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Searchspring fashion</h1>
        <form
          action=""
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(search2);
          }}
        >
          <label htmlFor="label" className="label">
            Searchspring fashion:
          </label>
          <input
            type="text"
            name="text"
            placeholder="Search for Brand, Color, Size..."
            className="input"
            onChange={handleChange}
            value={search2}
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
                  isPageSeen(pageNumber) && (
                    <button
                      id={pageNumber}
                      onClick={() => {
                        handleButtonClick(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </button>
                  )
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
