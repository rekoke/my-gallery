import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

import GridPost from './GridPost';
import SinglePost from './SinglePost';

const Display = props => {
  const {
    lastPosts,
    handleUpload,
    completed,
    actualPost,
    posted,
    signleView,
    handleView,
  } = props;

  return (
    <div className="display">
      {actualPost.fileSrc && actualPost.from && actualPost.title ? (
        <div className="display__options" onClick={handleView}>
          change to {signleView ? 'grid view' : 'single-view'}
        </div>
      ) : null}
      {actualPost.fileSrc ? (
        signleView ? (
          <SinglePost actualPost={actualPost} />
        ) : (
          <GridPost actualPost={actualPost} lastPosts={lastPosts} />
        )
      ) : null}
      {actualPost.fileSrc && actualPost.from && actualPost.title ? (
        <Button onClick={handleUpload}>
          {!posted ? (
            completed === 0 ? (
              'POST'
            ) : (
              <CircularProgress value={completed} variant="static" />
            )
          ) : (
            'POSTED!'
          )}
        </Button>
      ) : null}
    </div>
  );
};
export default Display;
