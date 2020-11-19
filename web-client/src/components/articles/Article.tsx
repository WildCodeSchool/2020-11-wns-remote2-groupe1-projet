import React from 'react';

type ArticleProps = {
  id: number;
  title: string;
  contents: string;
  image: string;
  key: number;
};

const Article = ({ title, contents }: ArticleProps): JSX.Element => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{contents}</p>
    </div>
  );
};

export default Article;
