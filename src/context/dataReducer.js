import { ACTIONS } from "./actions";

export const dataReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_DATA: {
      return { ...state, data: payload.data };
    }

    default:
      return state;
  }
};
