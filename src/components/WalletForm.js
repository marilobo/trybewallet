import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { walletReducer } = this.props;
    console.log(walletReducer.currencies.USD.code);
    return (
      <div>
        <p data-testid="value-input">Despesa valor</p>
        <p data-testid="description-input">Despesa descrição</p>
        <select
          data-testid="currency-input"
        >
          <option>{ walletReducer.currencies.USD.code }</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  walletReducer: state.wallet,
});

WalletForm.propTypes = {
  walletReducer: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(WalletForm);
