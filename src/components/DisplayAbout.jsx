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
  console.log('fileSrc-->', fileSrc);
  console.log('lastAboutShowing-->', lastAboutShowing);
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
          src={!lastAboutShowing ? fileSrc : lastAbout.fileSrc}
        />
        <div className="display-about__last-container__text">
          {about !== '' && !lastAboutShowing ? about : lastAbout.about}
        </div>
      </div>
      {about || fileSrc ? (
        <Button onClick={handleUpload}>Upload new about</Button>
      ) : null}
    </div>
  );
};
export default DisplayAbout;
