import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import React from 'react';

import { auth } from '../firebase';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      pwderror: false,
    };
  }

  handleChange = e => {
    this.setState({
      password: e.target.value,
      pwderror: false,
    });
  };

  onSubmit = e => {
    const { password } = this.state;
    const { userAdmin } = this.props;
    e.preventDefault();
    auth
      .signInWithEmailAndPassword('rekoke92@gmail.com', password)
      .then(function() {
        userAdmin(true);
      })
      .catch(error => {
        console.log('error', error);
        userAdmin(false);
        this.setState({
          pwderror: true,
        });
      });

    this.setState({
      password: '',
    });
  };

  render() {
    const { password, pwderror } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Input
            error={pwderror}
            id="outlined-basic"
            label="Password"
            onChange={e => this.handleChange(e)}
            type="password"
            value={password}
            variant="outlined"
          />

          <Button color="primary" type="submit" variant="contained">
            Sign In
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
