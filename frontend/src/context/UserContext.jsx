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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedForms, setAddedForms] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [entryId, setEntryId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedForms = localStorage.getItem("forms");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (storedForms) {
          setAddedForms(JSON.parse(storedForms));
        }
      } catch (err) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);
  
  const login = (userData) => {};

  const addForm = (updater) => {
    setAddedForms((prev) => {
      const updated = typeof updater === "function" ? updater(prev) : updater;

      const unique = [...new Set(updated)];

      localStorage.setItem("forms", JSON.stringify(unique));

      return unique;
    });
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleDelete = (id) => {
    setEntryId(id)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        updateUser,
        loading,
        addedForms,
        addForm,
        activeForm,
        setActiveForm,
        isEditing,
        setIsEditing,
        entryId,
        setEntryId,
        handleDelete,
        isDeleting,
        setIsDeleting,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
