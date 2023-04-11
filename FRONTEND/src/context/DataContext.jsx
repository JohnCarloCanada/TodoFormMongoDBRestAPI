import { createContext, useState, useEffect } from "react";
import { useAxiosFetch } from "../hooks";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editID, setEditID] = useState(null);
  const { data, fetchError, isLoading } = useAxiosFetch("https://todo-restapi.onrender.com/todo");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setTodos(data);

    return () => (isMounted = false);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        filter,
        setFilter,
        todos,
        setTodos,
        editID,
        setEditID,
        fetchError,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
