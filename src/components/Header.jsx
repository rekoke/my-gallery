import Button from '@material-ui/core/Button';
import React from 'react';

const Header = props => {
  const { handlePostView, isAdmin, postView } = props;
  const title = isAdmin ? 'Admin' : 'Home';

  return (
    <div className="header">
      <h1>{title}</h1>
      <Button onClick={handlePostView}>
        {postView ? 'edit about' : 'edit post'}
      </Button>
    </div>
  );
};

export default Header;
