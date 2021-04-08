import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';

const Article : NextPage<{id: string}> = ({ id }) => {
  console.log(id);
  return (
    <>
      <div className="article">
        <Typography>Article page</Typography>
      </div>
    </>
  );
};

export default Article;
