import { useRef } from "react";

export default function Control({ setCategories, setSorting, setQuery, setOffsetValue }) {
  const keywordsInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    setQuery(keywordsInputRef.current.value);
    setOffsetValue(0);
  }

  return (
    <div className="navigation">
      <div className="dropdowns">
        <select
          id="categories"
          name="categories"
          className="dropdown"
          onChange={(e) => setCategories(e.target.value)}
        >
          <option value="sports,technology">Category(All)</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <form className="form" onSubmit={submitFormHandler}>
        <input type="text" id="keywords" ref={keywordsInputRef} />
        <button type="submit">
          <img src="./search.png" alt="search_icon" />
        </button>
      </form>
      <div className="dropdowns">
        <select
          id="sort"
          name="sort"
          className="dropdown"
          onChange={(e) => setSorting(e.target.value)}
        >
          <option value="published_desc">Sort(newest)</option>
          <option value="published_asc">Sort(oldest)</option>
          <option value="popularity">Popular</option>
        </select>
      </div>
    </div>
  );
}
