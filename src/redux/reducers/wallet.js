import { DELETE_EXPENSE, EDITED_EXPENSE, EDIT_EXPENSE, REQUEST_ERROR,
  REQUEST_SUCCESS, SAVE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case REQUEST_ERROR:
    return {
      ...state,
      errorMessage: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.id,
      editor: true,
    };
  case EDITED_EXPENSE:
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
