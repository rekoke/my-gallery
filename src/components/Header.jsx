import Button from '@material-ui/core/Button';
import React from 'react';

const Header = props => {
  const { handlePostView, isAdmin, postView } = props;
  const title = isAdmin ? 'admin' : 'Home';

  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      <div className="header__right">
        <Button onClick={handlePostView}>
          {postView ? 'edit about' : 'edit post'}
        </Button>
        {isAdmin ? <Button>home</Button> : null}
      </div>
    </div>
  );
};

export default Header;
