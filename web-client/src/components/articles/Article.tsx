import React from 'react';
import { ArticleProps } from '../../types';

const webImage =
  'https://st.depositphotos.com/1005682/2476/i/600/depositphotos_24762569-stock-photo-fast-food-hamburger-hot-dog.jpg';

const Article = ({ title, image, contents }: ArticleProps): JSX.Element => {
  return (
    <div className="article">
      <h2>{title}</h2>
      <img src={webImage} />
      <p>{contents}</p>
    </div>
  );
};

export default Article;
