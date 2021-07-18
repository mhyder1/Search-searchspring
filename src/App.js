import "./App.css";

function App() {
  const SEARCH_API_URL =
    "https://scmq7n.a.searchspring.io/api/search/search.json?q=dress&resultsFormat=native&siteId=scmq7n";
  //[siteId].a.searchspring.io/api/search/search.json?q=dress&resultsFormat=native&siteId=[siteId]

  https: return (
    <div className="App">
      <div className="container">
        <h1 className="title">Searchspring fashion</h1>
        <form action="" className="form">
          <label htmlFor="label" className="label">
            Searchspring fashion:
          </label>
          <input
            type="text"
            placeholder="Search for Brand, Color, Size..."
            className="input"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
