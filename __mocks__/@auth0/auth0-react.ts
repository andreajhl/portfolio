function noop() {}

const initialContext = {
  getAccessTokenSilently: noop,
  getAccessTokenWithPopup: noop,
  getIdTokenClaims: noop,
  loginWithRedirect: noop,
  loginWithPopup: noop,
  logout: noop,
  error: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const withAuthenticationRequired = (Component) => Component;
export const useAuth0 = () => initialContext;
// export { useAuth0, withAuth0, Auth0Provider };
