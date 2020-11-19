import React from 'react';
import { ArticleProps } from '../../types';

const Article = ({ title, contents }: ArticleProps): JSX.Element => {
  return (
    <>
      <h2>{title}</h2>
      <p>{contents}</p>
    </>
  );
};

export default Article;
