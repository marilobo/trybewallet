import React from 'react';

class Login extends React.Component {
  // state = {
  //   disabled: true,
  // };

  disabledButton = () => {

  };

  render() {
    return (
      <form>
        <label htmlFor="inputEmail" data-testid="email-input">
          <input name="inputEmail" id="inputEmail" type="email" />
        </label>
        <label htmlFor="inputPassword" data-testid="password-input">
          <input
            name="inputPassword"
            id="inputPassword"
            type="password"
            minLength={ 6 }
          />
        </label>
        <button type="button" disabled={ this.disabledButton }>Entrar</button>
      </form>
    );
  }
}

export default Login;
