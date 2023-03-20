import { ACTIONS } from "./actions";

export const truckReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_TRUCKS: {
      return { ...state, trucks: payload.trucks };
    }

    default:
      return state;
  }
};
