import { createContext, useState, useContext } from "react";
const authContext = createContext(null);
export const useAuth = () => {
  return useContext(authContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <authContext.Provider value={[user, setUser]}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
