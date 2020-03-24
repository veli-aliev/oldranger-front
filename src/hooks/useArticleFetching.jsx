import { useState, useEffect } from 'react';
import queries from '../serverQueries';

function useArticleFetching(id, page = 0) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await queries.getArticleById({ id, page });
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [id, page]);

  return {
    error,
    loading,
    results,
  };
}

export default useArticleFetching;
