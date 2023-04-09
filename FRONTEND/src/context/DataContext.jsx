import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editID, setEditID] = useState(null);
  const { data } = useAxiosFetch("http://localhost:3000/todo");

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
