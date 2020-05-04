import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const Upload = props => {
  const { handleChangeInput, handleChangeImg } = props;

  return (
    <div className="upload-form">
      <form autoComplete="off" noValidate>
        <TextField
          id="outlined-basic"
          label="Title"
          name="title"
          onChange={e => handleChangeInput(e)}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="From"
          name="from"
          onChange={e => handleChangeInput(e)}
          variant="outlined"
        />
        <Input onChange={handleChangeImg} type="file" />
      </form>
    </div>
  );
};

export default Upload;
