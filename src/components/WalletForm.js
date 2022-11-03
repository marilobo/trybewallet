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

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkWalletAPI());
  }

  handleInputValue = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  addExpense = async () => {
    const { walletReducer } = this.props;
    const { expenses } = walletReducer;
    const filteredCoins = await fetchFunction();
    this.setState(({
      exchangeRates: filteredCoins,
      id: expenses.length,
    }), () => this.sendToGlobalState());
  };

  sendToGlobalState = () => {
    const { dispatch } = this.props;
    dispatch(saveExpense(this.state));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { walletReducer } = this.props;
    const { currencies } = walletReducer;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleInputValue }
          />
        </label>
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleInputValue }
          />
        </label>
        <select
          data-testid="currency-input"
          onChange={ this.handleInputValue }
          name="currency"
          value={ currency }
        >
          {currencies
            .map((coin) => <option key={ coin }>{ coin }</option>)}
        </select>
        <select
          data-testid="method-input"
          onChange={ this.handleInputValue }
          name="method"
          value={ method }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleInputValue }
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
