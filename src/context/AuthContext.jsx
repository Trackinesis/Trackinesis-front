import {useContext, createContext, useState} from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};