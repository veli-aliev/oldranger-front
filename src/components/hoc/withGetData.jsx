import React, { useState, useEffect } from 'react';

import queries from '../../serverQueries';

const getData = async (url, { changeDataState, changeLoadingState }) => {
  changeLoadingState(true);
  const data = await queries.getData(url);
  changeDataState(data);
  changeLoadingState(false);
};

const withGetData = (WrappedComponent, url) => {
  return props => {
    const [isLoading, changeLoadingState] = useState(false);
    const [data, changeDataState] = useState({});

    useEffect(() => {
      getData(url, { changeDataState, changeLoadingState });
    }, []);

    return <WrappedComponent {...props} isLoading={isLoading} data={data} />;
  };
};

export default withGetData;
