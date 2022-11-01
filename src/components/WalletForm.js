import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpense, thunkWalletAPI } from '../redux/actions';
import fetchFunction from '../helpers/fetchFunction';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkWalletAPI());
  }

  handleSelectValue = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  addExpense = async () => {
    const filteredCoins = await fetchFunction();
    this.setState((prev) => ({
      exchangeRates: filteredCoins,
      id: prev.id + 1,
    }));

    const { dispatch } = this.props;
    dispatch(saveExpense(this.state));
  };

  render() {
    const { walletReducer } = this.props;
    const { currencies } = walletReducer;
    const { currency, method, tag } = this.state;
    return (
      <div>
        <p data-testid="value-input">Despesa valor</p>
        <p data-testid="description-input">Despesa descrição</p>
        <select
          data-testid="currency-input"
          onChange={ this.handleSelectValue }
          name="currency"
          value={ currency }
        >
          {currencies
            .map((coin) => <option key={ coin }>{ coin }</option>)}
        </select>
        <select
          data-testid="method-input"
          onChange={ this.handleSelectValue }
          name="method"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleSelectValue }
          name="tag"
          value={ tag }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
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
