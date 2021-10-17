import { useState, useRef, useCallback } from "react";
// import ReactPaginate from "react-paginate";

import GetArticles from "../components/UI/GetArticles";
import Card from "../components/UI/Card";

export default function InfiniteScrollPage() {
  const articlesPerPage = 100;

  const [keywords, setKeywords] = useState("");
  const [query, setQuery] = useState("");
  const [offsetValue, setOffsetValue] = useState(0);
  const [sorting, setSorting] = useState("published_desc");
  const [categories, setCategories] = useState("sports,technology");

  const { articles, hasMore, loading, error } = GetArticles(
    query,
    categories,
    sorting,
    offsetValue,
    articlesPerPage
  );

  const observer = useRef();
  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffsetValue((offsetValue) => offsetValue + articlesPerPage);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(keywords);
    setOffsetValue(0);
  };

  const handleInput = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div className="App">
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
        <form className="form" onSubmit={handleQuery}>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={handleInput}
          />
          <button type="submit">
            <img src="./search.png" alt="search_icon"/>
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
      <div className="articles">
        {articles.map((article, i) => {
          if (articles.length === i + 1) {
            return (
              <div ref={lastArticleRef}>
                <Card item={article} key={i} />
              </div>
            );
          } else {
            return (
              <div>
                <Card item={article} key={i} />
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error..."}</div>
      </div>
    </div>
  );
}
