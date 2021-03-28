// React-redux-firebase
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { fbConfig, rrfConfig } from "./util/config";
import store from "./redux/createStore";
// Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
// React-router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// MUI
import Theme from "./util/theme.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
// Pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Privacy from "./components/footer/pages/privacy";
import Terms from "./components/footer/pages/terms";
import Faq from "./components/footer/pages/faq";
import MyProfile from "./pages/my_profile";
import User from "./pages/user";
import Contacts from "./pages/contacts";

import EmailVerify from "./util/emailVerify";
import Chat from "./components/Chat";
import ChatSide from "./components/ChatSide";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import { UserIsAuth, UserIsNotAuth } from "./util/authRoutes";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

firebase.initializeApp(fbConfig);
firebase.firestore();

axios.defaults.baseURL =
  "http://localhost:5000/mansflirts-5add7/europe-west3/api";

function onGetCall(config) {
  return config.method === "post";
}
axios.interceptors.request.use(
  async function (config) {
    const idToken = await firebase.auth().currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  },
  null,
  { runWhen: onGetCall }
);

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rrfConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <Router>
            <Navbar />
            <ChatSide />
            <EmailVerify />
            <Switch>
              <Route exact path="/terms" component={UserIsNotAuth(Terms)} />
              <Route exact path="/privacy" component={UserIsNotAuth(Privacy)} />
              <Route exact path="/faq" component={UserIsNotAuth(Faq)} />
              <Route exact path="/login" component={UserIsNotAuth(Login)} />
              <Route exact path="/signup" component={UserIsNotAuth(Signup)} />
              <Route
                exact
                path="/chat/:usersIds"
                component={UserIsAuth(Chat)}
              />
              <Route exact path="/contacts" component={UserIsAuth(Contacts)} />
              <Route
                exact
                path="/my_profile"
                component={UserIsAuth(MyProfile)}
              />
              <Route exact path="/users/:userId" component={UserIsAuth(User)} />
              <Route exact path="/" component={UserIsAuth(Home)} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
