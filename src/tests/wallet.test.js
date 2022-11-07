import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';

const moedas = [
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
let initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [...moedas],
    expenses: [],
    editor: false,
    idToEdit: 0,
    errorMessage: '',
  },
};

describe('Bloco de testes sobre a página Wallet', () => {
  it('Testa se o email digitado no input aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const getButton = screen.getByRole('button');
    const getInputEmail = screen.getByTestId('email-input');
    const getInputPassword = screen.getByTestId('password-input');

    userEvent.type(getInputEmail, 'teste@email.com');
    userEvent.type(getInputPassword, '14253625');
    userEvent.click(getButton);

    expect(history.location.pathname).toBe('/carteira');
    const getUserEmail = screen.getByText('teste@email.com');
    expect(getUserEmail).toBeInTheDocument();
  });

  it('Testa se o valor total aparece na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent('0.00');
  });

  it('Testa se os inputs e botão se encontram tela', () => {
    renderWithRedux(<Wallet />, { initialState });

    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();

    const currencySelect = screen.getByTestId('currency-input');
    expect(currencySelect).toHaveValue('USD');
    expect(currencySelect).toHaveLength(15);

    const methodSelect = screen.getByTestId('method-input');
    expect(methodSelect).toHaveValue('Dinheiro');

    const tagSelect = screen.getByRole('option', { name: 'Alimentação' });
    expect(tagSelect).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addButton).toBeInTheDocument();

    const optionUSDT = screen.queryByRole('option', { name: 'USDT' });
    expect(optionUSDT).not.toBeInTheDocument();
  });

  it('Testa elementos da Table', async () => {
    initialState = {
      user: {
        email: 'mariana@email.com',
      },
      wallet: {
        currencies: [...moedas],
        expenses: [{
          id: 0,
          value: '12',
          description: 'batata',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: {
            USD: {
              code: 'USD',
              codein: 'BRL',
              name: 'Dólar Americano/Real Brasileiro',
              bid: '5.0461',
              ask: '5.0473',
            },
          },
        },
        ],
        editor: false,
        idToEdit: 0,
        errorMessage: '',
      },
    };
    renderWithRedux(<Wallet />, { initialState });

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const descriptionInput = screen.getByTestId('description-input');
    const valueInput = screen.getByTestId('value-input');
    const addButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(descriptionInput, 'batata');
    userEvent.type(valueInput, '12');
    userEvent.click(addButton);

    const addCell = await screen.findByRole('cell', { name: /batata/i });
    expect(addCell).toBeInTheDocument();

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toHaveTextContent('60.57');

    const deleteButton = screen.getByRole('button', { name: /Excluir/i });
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);
    expect(addCell).not.toBeInTheDocument();
  });

  it('Testa botão editar', async () => {
    initialState = {
      user: {
        email: 'mariana@email.com',
      },
      wallet: {
        currencies: [...moedas],
        expenses: [{
          id: 0,
          value: '2',
          description: 'couve',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Lazer',
          exchangeRates: {
            USD: {
              code: 'USD',
              codein: 'BRL',
              name: 'Dólar Americano/Real Brasileiro',
              bid: '5.0461',
              ask: '5.0473',
            },
          },
        },
        ],
        editor: false,
        idToEdit: 0,
        errorMessage: '',
      },
    };
    renderWithRedux(<Wallet />, { initialState });

    const addCell = await screen.findByRole('cell', { name: /couve/i });
    expect(addCell).toBeInTheDocument();

    const editButton = screen.getByRole('button', { name: /Editar/i });
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const editExpenseButton = screen.queryByRole('button', { name: /Editar despesa/i });
    expect(editExpenseButton).toBeInTheDocument();

    const addButton = screen.queryByRole('button', { name: /Adicionar despesa/i });
    expect(addButton).not.toBeInTheDocument();
  });
});
