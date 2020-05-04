import Button from '@material-ui/core/Button';
import React from 'react';

const DisplayAbout = props => {
  const {
    about,
    fileSrc,
    handleUpload,
    lastAbout,
    lastAboutShowing,
    toggleAbout,
  } = props;
  return (
    <div className="display-about">
      {about !== '' ? (
        <Button onClick={toggleAbout}>
          {lastAboutShowing ? 'see actual' : 'see last about'}
        </Button>
      ) : null}
      <div className="display-about__last-container">
        <img
          className="display-about__last-container__img"
          src={lastAbout.fileSrc}
        />
        <div className="display-about__last-container__text">
          {about !== '' && !lastAboutShowing ? about : lastAbout.about}
        </div>
      </div>
      <img src={fileSrc} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};
export default DisplayAbout;
