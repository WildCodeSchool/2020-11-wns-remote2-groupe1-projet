import React from 'react';
import { ArticleType } from '../../types';

const Article = ({ title, image, contents }: ArticleType): JSX.Element => {
  return (
    <>
      <div className="article">
        <h2>{title}</h2>
        <img src={image} />
        <p>{contents}</p>
      </div>
    </>
  );
};

export default Article;
