import "./App.css";
import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import Header from "./Header/Header";
import Search from "./Search/Search"
import Entries from './Entries/Entries'
import Pagination from './Pagination/Pagination'

function App() {
  const SEARCH_API_URL =
    "https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n&q=";

  const [search, setSearch] = useState("");
  const [results, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);

  useEffect(() => {
    const getData = () => {
      const url = `${SEARCH_API_URL}${search}&page=${currentPage}`;
      fetch(url)
        .then((res) => res.json())
        .then(({ results, pagination }) => {
          setResult(results);
          setCurrentPage(pagination.currentPage);
          setNextPage(pagination.nextPage);
          setTotalPages(pagination.totalPages);
          setPreviousPage(pagination.previousPage);
        });
    };
    getData();
  }, [search, currentPage]);

  const value = {
    setSearch,
    results,
    totalPages,
    setCurrentPage,
    currentPage,
    search,
    nextPage,
    previousPage
  };

  return (
    <AppContext.Provider value={value}>
      <div className="App">
        <div className="container">
          <Header />
          <Search />
          <div>
            <Pagination />
          </div>
          <Entries />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
