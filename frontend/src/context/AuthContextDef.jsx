import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  session: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  getAccessToken: () => {},
}); 