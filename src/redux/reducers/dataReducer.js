const initialState = {
  allUserData: [],
  allOpenChats: [],
  allNotifications: [],
  allCoins: [],
  searchParams: null,
  loading: false,
};

export default function DataReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_USERS":
      return {
        ...state,
        loading: true,
      };
    case "SET_ALLUSERS":
      return {
        ...state,
        allUserData: action.payload,
        loading: false,
      };
    case "RESET_ALLUSERS":
      state.allUserData.splice(action.payload);
      return {
        ...state,
        loading: false,
      };
    case "SET_ALLOPENCHATS":
      return {
        ...state,
        allOpenChats: action.payload,
      };
    case "SET_ALLNOTIFICATIONS":
      return {
        ...state,
        allNotifications: action.payload,
      };
    case "SET_SEARCH_PARAMS":
      return {
        ...state,
        searchParams: action.payload,
      };
    case "SET_PURCHASECOINS":
      return {
        ...state,
        loading: false,
        allCoins: action.payload,
      };
    default:
      return state;
  }
}
