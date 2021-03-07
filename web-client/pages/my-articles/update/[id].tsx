import { Typography } from '@material-ui/core';
import React from 'react';

const ArticleUpdate = ({ id }: { id: string }): JSX.Element => {
  return (
    <>
      <div className="article">
        <Typography>Article modification</Typography>
      </div>
    </>
  );
};

export default ArticleUpdate;
