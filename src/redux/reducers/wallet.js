import { REQUEST_ERROR, REQUEST_SUCCESS } from '../actions';

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
      currencies: action.payload,
    };
  case REQUEST_ERROR:
    return {
      ...state,
      errorMessage: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
