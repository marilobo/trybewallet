import fetchFunction from '../../helpers/fetchFunction';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export function thunkWalletAPI() {
  return async (dispatch) => {
    try {
      const data = await fetchFunction();
      dispatch(requestSuccess(data));
    } catch (error) {
      dispatch(requestError(error));
    }
  };
}
