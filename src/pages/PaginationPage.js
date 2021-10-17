import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";

import Card from "../components/UI/Card";


function PaginationPage() {
  let limit = 20;

  const [articles, setArticles] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [sorting, setSorting] = useState("published_desc");
  const [categories, setCategories] = useState("sports,technology");
  const keywordsInputRef = useRef();
  const [keywords, setKeywords] = useState("");
  const [offsetValue, setOffsetValue] = useState(0);

  let url =
    "http://api.mediastack.com/v1/news?access_key=4c41ba4d6d01027727f13c48990408e5"  +
    "&sort=" +
    sorting +
    "&categories=" +
    categories +
    "&languages=en&limit=" +
    limit;

  if (keywords) {
    url += "&keywords=" + encodeURIComponent(keywords);
  }

  if (offsetValue !== 0) {
    url += "&offset=" + offsetValue;
  }

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch(url);
      if (res.status >= 200 && res.status <= 299) {
        const data = await res.json();
        setPageCount(Math.ceil(data.pagination.total / limit));
        setArticles(data);
        setLoaded(true);
      } else {
        alert(res.statusText)
      }
    };

    getArticles();
  }, [sorting, categories, keywords, offsetValue]);

  const handlePageClick = (data) => {
    setOffsetValue(data.selected * limit);
  };

  function submitHandler(event) {
    event.preventDefault();

    setKeywords(keywordsInputRef.current.value);
  }
  return (
    <div className="App">
      <div>
        <div>
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
            <form className="form" onSubmit={submitHandler}>
              <input type="text" id="keywords" ref={keywordsInputRef} />
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
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
        <div className="articles">
          {isLoaded ? (
            articles.data.map((item, i) => {
              return <Card item={item} key={i} />;
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaginationPage;
