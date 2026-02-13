import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be use in UserProvider only");
  }

  return context;
};

const normalizeUser = (data) => {
  if (!data) return null;

  return {
    ...data,
    hasProfile: data.hasProfile ?? data.has_profile,
  };
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [addedForms, setAddedForms] = useState();
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false)
  }, []);
  const login = (userData) => {};

  const addForm = (formList) => {
    setAddedForms(formList);
    localStorage.setItem("forms", JSON.stringify(formList))
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, login, updateUser, loading, addedForms, addForm }}>
      {children}
    </UserContext.Provider>
  );
};
