import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error("useUser must be use in UserProvider only");
    }

    return context;
};

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    const login = (userData) => {

    };

    const updateUser = (userData) => {

    };
    
    return (
        <UserContext.Provider value={{user, login, updateUser}}>
            {children}
        </UserContext.Provider>
    )
};

