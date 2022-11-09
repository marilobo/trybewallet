import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';
import App from '../App';

const inputDeEmail = 'email-input';
const testeDeEmail = 'mariana@eueueu.com';
const password = 'password-input';

const coins = [
  'USD',
  'CAD',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'EUR',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP',
  'DOGE',
];
const initialState = {
  user: {
    email: testeDeEmail,
  },
  wallet: {
    currencies: [...coins],
    expenses: [],
    editor: false,
    idToEdit: 0,
    errorMessage: '',
  },
};

function fetchFunction() {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));
}

async function addExpense(description, value) {
  const descripInput = screen.getByTestId('description-input');
  const valueInput = screen.getByTestId('value-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const getAddButton = screen.getByRole('button', { name: /Adicionar despesa/i });

  userEvent.type(descripInput, description);
  userEvent.type(valueInput, value);
  userEvent.selectOptions(currencyInput, 'USD');
  userEvent.selectOptions(methodInput, 'Dinheiro');
  userEvent.selectOptions(tagInput, 'Alimentação');

  await act(() => {
    userEvent.click(getAddButton);
  });
}

async function editExpense() {
  const descripInput = screen.getByTestId('description-input');
  const valueInput = screen.getByTestId('value-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const getEditButton = screen.getByRole('button', { name: /Editar despesa/i });

  userEvent.type(descripInput, 'batata');
  userEvent.type(valueInput, '12');
  userEvent.selectOptions(currencyInput, 'USD');
  userEvent.selectOptions(methodInput, 'Dinheiro');
  userEvent.selectOptions(tagInput, 'Alimentação');

  await act(() => {
    userEvent.click(getEditButton);
  });
}

describe('Bloco de testes da página App', () => {
  it('Verifica se o e-mail aparece na página wallet', () => {
    renderWithRouterAndRedux(<App />);

    const getEmailInput = screen.getByTestId(inputDeEmail);
    userEvent.type(getEmailInput, testeDeEmail);

    const passwordInput = screen.getByTestId(password);
    userEvent.type(passwordInput, '465487');

    const getButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(getButton);

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toHaveTextContent(testeDeEmail);
  });

  it('Testa se o valor total aparece na tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent('0.00');
  });

  it('Verifica se o valor total de despesas é atualizado', async () => {
    fetchFunction();
    renderWithRouterAndRedux(<Wallet />, { initialState });

    await addExpense('goiaba', '7.00');
    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toHaveTextContent('33.27');
  });

  it('Verifica se a despesa está na tela e se o botão de excluir funciona', async () => {
    fetchFunction();
    renderWithRouterAndRedux(<Wallet />, { initialState });

    await addExpense('picles', '25.00');

    const table = screen.getAllByRole('rowgroup');
    expect(table[1].childNodes).toHaveLength(1);

    const deleteButton = screen.getByRole('button', { name: /Excluir/i });
    userEvent.click(deleteButton);
    expect(table[1].childNodes).toHaveLength(0);
  });

  it('Verifica se a despesa pode ser editada', async () => {
    fetchFunction();
    renderWithRouterAndRedux(<Wallet />, { initialState });

    await addExpense('goiaba', '7.00');
    await addExpense('manga', '15.00');

    const editButton = screen.getAllByTestId('edit-btn');
    userEvent.click(editButton[0]);

    await editExpense();

    const description = screen.getByText('batata');
    const expenseValue = screen.getByText('12.00');
    const goiaba = screen.queryByText('goiaba');
    expect(description).toBeInTheDocument();
    expect(expenseValue).toBeInTheDocument();
    expect(goiaba).not.toBeInTheDocument();
  });
});
