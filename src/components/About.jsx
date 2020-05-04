import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const About = props => {
  const { handleChangeInput, handleChangeImg } = props;

  return (
    <div className="upload-form">
      <form autoComplete="off" noValidate>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          name="about"
          onChange={e => handleChangeInput(e)}
          rows={4}
          variant="outlined"
        />
        <Input onChange={handleChangeImg} type="file" />
      </form>
    </div>
  );
};

export default About;
