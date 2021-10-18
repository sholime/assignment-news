import { useState, useRef, useCallback } from "react";

import GetArticles from "../components/UI/GetArticles";
import Card from "../components/layout/Card";
import Control from "../components/layout/Control";

export default function InfiniteScrollPage() {
  const articlesPerPage = 100;

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
    },
    [loading, hasMore]
  );

  return (
    <div className="App">
      <Control
        setCategories={setCategories}
        setSorting={setSorting}
        setQuery={setQuery}
        setOffsetValue={setOffsetValue}
      />
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
