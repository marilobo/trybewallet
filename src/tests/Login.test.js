import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const email = 'email-input';
const password = 'password-input';

describe('Bloco de testes sobre a página Login', () => {
  it('Verifica se o botão de entrar Entrar está na tela desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const getButton = screen.getByRole('button');
    expect(getButton).toBeInTheDocument();
    expect(getButton).toBeDisabled();
    expect(getButton).toHaveTextContent('Entrar');
  });

  it('Verifica se os inputs estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const getInputEmail = screen.getByTestId(email);
    expect(getInputEmail).toBeInTheDocument();

    const getInputPassword = screen.getByTestId(password);
    expect(getInputPassword).toBeInTheDocument();
  });

  it('Verifica se o botão é habilitado em condições específicas', () => {
    renderWithRouterAndRedux(<App />);

    const getButton = screen.getByRole('button');
    const getInputEmail = screen.getByTestId(email);
    const getInputPassword = screen.getByTestId(password);

    userEvent.type(getInputEmail, 'teste@email.com');
    userEvent.type(getInputPassword, '123456');
    expect(getButton).not.toBeDisabled();
  });

  it('Verifica se, ao clicar no botão Entrar, a página é redirecionada para a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const getButton = screen.getByRole('button');
    const getInputEmail = screen.getByTestId(email);
    const getInputPassword = screen.getByTestId(password);

    userEvent.type(getInputEmail, 'batata@email.com');
    userEvent.type(getInputPassword, '877878787');
    userEvent.click(getButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
