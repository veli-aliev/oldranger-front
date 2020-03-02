import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queries from '../../serverQueries';
import Article from './Article';

const useQuery = () => new URLSearchParams(useLocation().search);

const Articles = () => {
  const query = useQuery();
  const [articles, setArticles] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (query.get('tags') === null) {
      // TODO получение статей без тегов
      const temp = [
        {
          articleTags: [],
          commentCount: 0,
          date: '2019-11-01T21:36:35',
          draft: false,
          id: 3,
          likes: [],
          text: 'Нужен апи для вывода статей без тегов',
          title: 'Нужен апи для вывода статей без тегов',
        },
      ];
      setArticles(temp);
    } else {
      const tags = query.get('tags').split('_');
      queries.getArticlesByTag(tags).then(el => {
        setArticles(el.content);
        setIsEmpty(el.empty);
      });
    }
  }, []);

  const LoadOrNotFound = isEmpty ? <h1>Статей по этому тегу не найдено</h1> : <Spin />;
  return (
    <>
      {articles.length === 0 ? LoadOrNotFound : null}
      {articles.reverse().map(el => {
        return <Article key={el.id} articleInfo={el} />;
      })}
    </>
  );
};

// class Articles extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       isEmpty: false,
//     };
//   }
//
//   componentDidMount() {
//
//     // queries.getArticlesByTag(articleTag).then(el => {
//     //   this.setState({ articles: el.content, isEmpty: el.empty });
//     // });
//   }
//
//   render() {
//     const { articles, isEmpty } = this.state;
//     const LoadOrNotFound = isEmpty ? <h1>Статей по этому тегу не найдено</h1> : <Spin />;
//     return (
//       <>
//         {articles.length === 0 ? LoadOrNotFound : null}
//         {articles
//           // .filter(el => el.hideToAnon !== true)
//           .reverse()
//           .map(el => {
//             return <Article key={el.id} articleInfo={el} />;
//           })}
//       </>
//     );
//   }
// }

Articles.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default withRouter(Articles);
