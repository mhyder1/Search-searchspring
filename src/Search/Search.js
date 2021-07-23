import AppContext from "../AppContext";
import { useContext, useState } from "react";

const Search = () => {
  const { setSearch } = useContext(AppContext);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  }
  return (
    <form
      action=""
      className="form"
      onSubmit={handleSubmit}
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
        value={input}
      />
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );
};

export default Search;
