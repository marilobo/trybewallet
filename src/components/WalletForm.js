import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editedExpense, saveExpense, thunkWalletAPI } from '../redux/actions';
import fetchFunction from '../helpers/fetchFunction';
import '../css/wallet.css';
import Header from './Header';

class WalletForm extends Component {
  state = {
    id: -1,
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
    const filteredCoins = await fetchFunction();
    this.setState((prev) => ({
      exchangeRates: filteredCoins,
      id: prev.id + 1,
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

  editExpense = () => {
    const { walletReducer: { idToEdit, expenses } } = this.props;
    const editedExpenses = expenses;
    editedExpenses[idToEdit] = this.state;
    editedExpenses[idToEdit].id = idToEdit;
    this.setState(({}), () => this.sendEdit(editedExpenses));
  };

  sendEdit = (expenses) => {
    const { dispatch } = this.props;
    dispatch(editedExpense(expenses));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { walletReducer } = this.props;
    const { currencies, editor } = walletReducer;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="main-container">
        <Header />
        <div className="wallet-container">
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleInputValue }
              className="description"
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
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              onChange={ this.handleInputValue }
              name="currency"
              value={ currency }
            >
              {currencies
                .map((coin) => <option key={ coin }>{ coin }</option>)}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
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
          </label>
          <label htmlFor="tag">
            Categoria da despesa
            <select
              data-testid="tag-input"
              onChange={ this.handleInputValue }
              name="tag"
              value={ tag }
              className="category"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
        <div className="button-div">
          { !editor
            ? (
              <button
                type="button"
                onClick={ this.addExpense }
              >
                Adicionar despesa
              </button>)
            : (
              <button
                type="button"
                onClick={ this.editExpense }
              >
                Editar despesa
              </button>)}
        </div>

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
