import { getStorage, updateStorage } from "@/utils/util";
import { createContext, useContext, useState } from "react";

export const Stores = createContext();

export const useStore = () => useContext(Stores);

export default function StoreProvider({ children }) {
  const [todos, setTodos] = useState(getStorage("todos") || []);
  const [users, setUsers] = useState(getStorage("users") || []);
  const [userLogin, setUserLogin] = useState(getStorage("userLogin") || {});

  const updateTodo = (value) => {
    setTodos(value);
    updateStorage("todos", JSON.stringify(value));
  };

  const updateUsers = (value) => {
    setUsers(value);
    updateStorage("users", JSON.stringify(value));
  };

  const updateUserLogin = (value) => {
    setUserLogin(value);
    updateStorage("userLogin", JSON.stringify(value));
  };

  return (
    <Stores.Provider
      value={{
        todos,
        updateTodo,
        users,
        updateUsers,
        userLogin,
        updateUserLogin,
      }}
    >
      {children}
    </Stores.Provider>
  );
}
