import { useContext, useEffect } from "react";
import DataContext from "./context/DataContext";
import TodoEditModal from "./components/TodoEditModal";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const { modalOpen, todos, filter, setFilter } = useContext(DataContext);
  const { isLoading } = useAxiosFetch();

  return (
    <main className="w-full min-h-screen bg-cyan-200 dark:bg-zinc-900 duration-500 ease py-2 px-4 pb-5">
      <TodoHeader />
      <TodoInput />
      {isLoading && <p>Loading Todos....</p>}
      {!isLoading && (
        <TodoList
          todos={todos.filter((todo) => (filter === "all" ? todo : todo.category.toLowerCase().includes(filter.toLowerCase())))}
          setFilter={setFilter}
        />
      )}
      {modalOpen && <TodoEditModal />}
    </main>
  );
}

export default App;
