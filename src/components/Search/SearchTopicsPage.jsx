import React from 'react';
import { useParams } from 'react-router-dom';

const SearchTopicsPage = () => {
  const { searchRequest } = useParams();
  return (
    <>
      <h1>Результы поиска в темах по запросу &apos{searchRequest}&apos</h1>
      <div>Search Topics Page</div>
    </>
  );
};

export default SearchTopicsPage;
