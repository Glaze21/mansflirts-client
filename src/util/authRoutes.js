import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

export const UserIsAuth = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: "/login",
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  wrapperDisplayName: "UserIsAuthenticated",
});

export const UserIsNotAuth = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: "/",
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  wrapperDisplayName: "userIsNotAuthenticated",
});
