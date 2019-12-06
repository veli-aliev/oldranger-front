import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getData = async (url, { changeDataState, changeLoadingState }) => {
  changeLoadingState(true);
  const res = await axios.get(`http://localhost:8888/${url}`, {
    withCredentials: true,
  });
  changeDataState(res.data);
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
