import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();
  const result = Object.fromEntries(
    location.search
      .slice(1)
      .split('&')
      .map(el => el.split('='))
  );
  return result;
};

export default useQuery;
