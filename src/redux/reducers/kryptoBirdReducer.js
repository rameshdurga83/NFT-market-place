import initalState from "./initialState";
import * as actionTypes from "../actions/constants/ActionTypes";

const kryptoBirdReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNT:
      return { ...state, address: action.payLoad };
    case actionTypes.SET_CONTRACT:
      return { ...state, contract: action.payLoad };
    case actionTypes.SET_NFT_ARRAY:
      return { ...state, kryptoBirdz: action.payLoad };
    case actionTypes.MINT_NFT:
      return { ...state, kryptoBirdz: [...state.kryptoBirdz, action.payLoad] };
    case actionTypes.SET_TOTAL_SUPPLY:
      return { ...state, totalSupply: action.payLoad };
    case actionTypes.SET_CURRENT_KBIRD:
      return { ...state, currentKbird: action.payLoad };
    case actionTypes.TRANSFER_NFT:
      return {
        ...state,
        currentKbird: {
          ...state.currentKbird,
          owner: action.payLoad,
          approved: "0x0",
        },
      };
    default:
      return state;
  }
};

export default kryptoBirdReducer;
