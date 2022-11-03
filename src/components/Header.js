import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
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
        <span data-testid="header-currency-field">BRL</span>
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
