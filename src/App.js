import "./App.css";

function App() {
  const SEARCH_API_URL =
    "https://[siteId].a.searchspring.io/api/search/search.json";

  return (
    <div className="App">
      <h1>Searchspring fashion</h1>
      <form action="">
        <label htmlFor="label" className="label">
          Searchspring fashion:
        </label>
        <input type="text" placeholder="Search for Brand, Color, Size..." />
        <button>Search</button>
      </form>
    </div>
  );
}

export default App;
