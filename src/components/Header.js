import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/header.css';
import logo from '../img/logo.png';
import despesas from '../img/despesas.png';
import emailLogo from '../img/email.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header">
        <img src={ logo } alt="Logo TrybeWallet" className="logo-header" />
        <span className="total-despesas">
          <img src={ despesas } alt="Despesas" className="despesas" />
          <span>Total de despesas: </span>
          <span data-testid="total-field">
            {
              expenses.reduce((acc, curr) => (
                acc + (
                  Number(curr.exchangeRates[curr.currency].ask) * (
                    Number(curr.value)
                  )
                )
              ), 0).toFixed(2)
            }
          </span>
          <span data-testid="header-currency-field"> BRL</span>
        </span>
        <span className="email-container">
          <img src={ emailLogo } alt="Email logo" className="email-logo" />
          <p className="email" data-testid="email-field">{email}</p>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  sum: state.expensesSumAction,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
