import { createContext, useEffect, useState } from "react";
import { setAuthorizationHeader } from './HttpService';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // console.log("token changed: ", token);
    if (token) {
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.sub);
      setName(decodedToken.name)
      setRoles(decodedToken.roles);
      setAuthorizationHeader(token); 

    } else {
      handleLogout();
    }
  }, [token]);

  const handleLogout = () => {
    setAuthorizationHeader('');
    setToken('');
    setName('');
    setEmail('');
    setRoles([]);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !token;
  }
  const hasSellerRole = () => {
    return jwtDecode(token).roles.includes('SELLER');
  }
  const hasCustomerRole = () => {
    return jwtDecode(token).roles.includes('CUSTOMER');
  }
  const hasAdminRole = () => {
    return jwtDecode(token).roles.includes('ADMIN');
  }

  const contextValue = {
    token,
    setToken,
    email, roles, name,
    handleLogout,
    isAuthenticated,
    hasSellerRole,
    hasCustomerRole,
    hasAdminRole,
  }

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;