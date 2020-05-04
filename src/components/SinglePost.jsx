import React from 'react';

const SinglePost = props => {
  const { actualPost } = props;
  return (
    <div className="single-post">
      <img className="single-post__img" src={actualPost.fileSrc} />
      <div className="single-post__title">{actualPost.title}</div>
      <div className="single-post__from">{actualPost.from}</div>
    </div>
  );
};

export default SinglePost;
