import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkWalletAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkWalletAPI());
  }

  render() {
    const { walletReducer } = this.props;
    const { currencies } = walletReducer;
    return (
      <div>
        <p data-testid="value-input">Despesa valor</p>
        <p data-testid="description-input">Despesa descrição</p>
        <select
          data-testid="currency-input"
        >
          {currencies
            .map((coin) => <option key={ coin }>{ coin }</option>)}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
