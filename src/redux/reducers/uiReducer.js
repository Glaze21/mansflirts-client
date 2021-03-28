const initialState = {
  openCoinsPopper: false,
  loading: false,
  errors: null,
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case "LOADING_UI":
      return {
        ...state,
        loading: true,
      };
    case "SET_BUYCOINSDIALOG":
      return {
        ...state,
        openCoinsPopper: !state.openCoinsPopper,
      };
    default:
      return state;
  }
}
