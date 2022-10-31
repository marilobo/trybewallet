export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const userEmail = (charsEmail) => ({
  type: USER_EMAIL,
  payload: charsEmail,
});

export const requestSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  payload: currencies,
});

export const requestError = (error) => ({
  type: REQUEST_ERROR,
  error,
});

export function thunkWalletAPI() {
  return async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await request.json();
      dispatch(requestSuccess(data));
    } catch (error) {
      dispatch(requestError(error));
    }
  };
}
