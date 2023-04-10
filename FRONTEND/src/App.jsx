import { useContext, useEffect } from "react";
import DataContext from "./context/DataContext";
import { TodoEditModal, TodoHeader, TodoInput, TodoList, Loader, ErrorHandling } from "./components";

function App() {
  const { modalOpen, todos, filter, setFilter, fetchError, isLoading } = useContext(DataContext);

  return (
    <main className="w-full min-h-screen bg-cyan-200 dark:bg-zinc-900 duration-500 ease py-2 px-4 pb-5">
      <TodoHeader />
      <TodoInput />

      {isLoading && <Loader />}
      {!isLoading && fetchError && <ErrorHandling fetchError={fetchError} />}
      {!isLoading && !fetchError && (
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
