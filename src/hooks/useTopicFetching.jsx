import { useState, useEffect } from 'react';
import queries from '../serverQueries';

function useTopicFetching(id, page = 0, limit = 1) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await queries.getTopic(id, page, limit);
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [id, page, limit]);

  return {
    error,
    loading,
    results,
  };
}

export default useTopicFetching;
