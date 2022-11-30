import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';
import '../css/login.css';

class Login extends React.Component {
  state = {
    charsEmail: '',
    charsPassword: '',
    passwordSixChars: false,
  };

  getPasswordChars = ({ target }) => {
    this.setState({ charsPassword: target.value }, this.disabledButton);
  };

  getEmailChars = ({ target }) => {
    this.setState({ charsEmail: target.value }, this.disabledButton);
  };

  disabledButton = () => {
    const { charsPassword, charsEmail } = this.state;
    const six = 6;
    const emailValidation = /\S+@\S+\.\S+/;
    if (charsPassword.length >= six && emailValidation.test(charsEmail)) {
      this.setState({ passwordSixChars: true });
    } else {
      this.setState({ passwordSixChars: false });
    }
  };

  loginButton = () => {
    const { charsEmail } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userEmail(charsEmail));

    history.push('/carteira');
  };

  render() {
    const { passwordSixChars } = this.state;
    return (
      <form className="form">
        <input
          data-testid="email-input"
          name="inputEmail"
          id="inputEmail"
          type="email"
          onChange={ this.getEmailChars }
          placeholder="Email"
          className="input"
        />
        <input
          data-testid="password-input"
          name="inputPassword"
          id="inputPassword"
          type="password"
          minLength={ 6 }
          onChange={ this.getPasswordChars }
          placeholder="Senha"
          className="input"
        />
        <button
          type="button"
          disabled={ !passwordSixChars }
          onClick={ this.loginButton }
          className="button"
        >
          Entrar

        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  userReducer: state.user,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Login);
