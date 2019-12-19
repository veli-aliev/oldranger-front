import React from 'react';

class SearchCommentsPage extends React.Component {
  componentDidMount() {}

  render() {
    // const { searchRequest } = useParams();
    return (
      <>
        <h1>
          Результы поиска в сообщениях по запросу <b>searchRequest</b>
        </h1>
        <div>Search Comments Page</div>
      </>
    );
  }
}

export default SearchCommentsPage;
