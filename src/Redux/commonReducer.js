import { SET_WALLET } from "./actionTypes";

const initial_state = {
  deposit: {
    wallet: "",
    amt: 0,
  },
};

const commonReducer = (state = initial_state, action = {}) => {
  switch (action.type) {
    case SET_WALLET:
      return { ...state, deposit: { ...action.payload } };
    default:
      return state;
  }
};

export default commonReducer;
