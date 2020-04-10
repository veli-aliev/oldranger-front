const useQuery = (location, key) => {
  const result = Object.fromEntries(
    location.search
      .slice(1)
      .split('&')
      .map(el => el.split('='))
  );
  return result[key];
};

export default useQuery;
