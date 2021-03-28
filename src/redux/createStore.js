import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  data: dataReducer,
  UI: uiReducer,
});

const initialState = {};
const middlewares = [thunk.withExtraArgument(getFirebase)];
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middlewares)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
