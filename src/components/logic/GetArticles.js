import { useEffect, useState } from "react";
import axios from "axios";

export default function GetArticles(query, categories, sorting, offsetValue, articlesPerPage) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  //   Append/Reset Articles setup
  const [oldQuery, setOldQuery] = useState("");
  const [oldCategories, setOldCategories] = useState("sports&technology");
  const [oldSorting, setOldSorting] = useState("published_desc");

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://api.mediastack.com/v1/news",
      params: {
        access_key: "70f8a920cee2b4ad5c1bf50a2791adf1",
        languages: "en",
        limit: articlesPerPage,
        offset: offsetValue,
        keywords: query,
        categories: categories,
        sort: sorting,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        //   Append/Reset Articles logic
        if (
          oldQuery === query &&
          oldCategories === categories &&
          oldSorting === sorting
        ) {
          setArticles((prevArticles) => {
            return [...prevArticles, ...res.data.data];
          });
        } else {
          setArticles(res.data.data);
        }

        setHasMore(offsetValue < res.data.pagination.total - articlesPerPage);
        setLoading(false);
        console.log(res.data);

        //   Append/Reset Articles update
        setOldQuery(query);
        setOldCategories(categories);
        setOldSorting(sorting);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, categories, sorting, offsetValue]);

  return { articles, hasMore, loading, error };
}
