import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import '../css/wallet.css';
import deleteBtn from '../img/delete-btn.svg';
import editBtn from '../img/edit-btn.svg';

class Table extends Component {
  deleteExpenseButton = (e) => {
    const { dispatch, expenses } = this.props;
    const filterExpenses = expenses.filter((expense) => expense.id !== e.id);
    dispatch(deleteExpense(filterExpenses));
  };

  editExpenseButton = (e) => {
    const { dispatch } = this.props;
    const idToEdit = e.id;

    dispatch(editExpense(idToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-row">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((e) => (
              <tr className="table-row" key={ e.id }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ Number(e.value).toFixed(2) }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ (+e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>{ (+e.exchangeRates[e.currency].ask * e.value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <input
                    type="image"
                    alt="Delete"
                    src={ editBtn }
                    className="btn-img"
                    data-testid="edit-btn"
                    onClick={ () => this.editExpenseButton(e) }
                  />
                  <input
                    type="image"
                    alt="Edit"
                    src={ deleteBtn }
                    className="btn-img"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpenseButton(e) }
                  />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
