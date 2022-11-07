import fetchFunction from '../../helpers/fetchFunction';

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';

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

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const editedExpense = (expenses) => ({
  type: EDITED_EXPENSE,
  expenses,
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
