import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';

const initialState = {
  user: {},
  wallet: {
    currencies: [
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
    ],
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

    const methodSelect = screen.getByTestId('method-input');
    expect(methodSelect).toHaveValue('Dinheiro');

    const tagSelect = screen.getByRole('option', { name: 'Alimentação' });
    expect(tagSelect).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addButton).toBeInTheDocument();
  });
});
