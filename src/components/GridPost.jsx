import React from 'react';

import SinglePost from './SinglePost';

const GridPost = props => {
  const { actualPost, lastPosts } = props;

  return (
    <div className="grid-post">
      <SinglePost actualPost={actualPost} />
      {lastPosts.map(info => {
        return <SinglePost actualPost={info} />;
      })}
    </div>
  );
};

export default GridPost;
