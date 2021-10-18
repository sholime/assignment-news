import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import Control from "../components/layout/Control";

import Card from "../components/UI/Card";
import DummyData from "../DummyData";

function PaginationPage() {
  let limit = 20;

  const [articles, setArticles] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [sorting, setSorting] = useState("published_desc");
  const [categories, setCategories] = useState("sports,technology");
  const [query, setQuery] = useState("");
  const [offsetValue, setOffsetValue] = useState(0);

  let url =
    "http://api.mediastack.com/v1/news?access_key=4c41ba4d6d01027727f13c48990408e5" +
    "&sort=" +
    sorting +
    "&categories=" +
    categories +
    "&languages=en&limit=" +
    limit;

  if (query) {
    url += "&keywords=" + encodeURIComponent(query);
  }

  if (offsetValue !== 0) {
    url += "&offset=" + offsetValue;
  }

  useEffect(() => {
    const getArticles = async () => {
      // const res = await fetch(url);
      // if (res.status >= 200 && res.status <= 299) {
      //   const data = await res.json();
      //   setPageCount(Math.ceil(data.pagination.total / limit));
      //   setArticles(data);
      //   setLoaded(true);
      // } else {
      //   alert(res.statusText)
      // }
      const data = DummyData();
      setPageCount(Math.ceil(data.pagination.total / limit));
      setArticles(data);
      setLoaded(true);
      console.log(url);
    };

    getArticles();
  }, [sorting, categories, query, offsetValue]);

  const handlePageClick = (data) => {
    setOffsetValue(data.selected * limit);
  };

  return (
    <div className="App">
      <Control
        setCategories={setCategories}
        setSorting={setSorting}
        setKeywords={setQuery}
        setOffsetValue={setOffsetValue}
      />
      <div>
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
