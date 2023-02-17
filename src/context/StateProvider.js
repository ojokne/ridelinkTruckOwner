import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";

const AuthenticationContext = createContext();

export const StateProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    id: null,
  });

  return (
    <AuthenticationContext.Provider value={{ auth, authDispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
