import React, { useContext, useState } from "react";
import DataContext from "../context/DataContext";
import api from "../api/todo";

const TodoInput = () => {
  const { setTodos } = useContext(DataContext);
  const [newTodos, setNewTodos] = useState("");
  const [category, setCategory] = useState("");

  const addTodos = async () => {
    if (!newTodos.trim() || newTodos.trim() === " " || !category) return;
    const newTodoItem = { todo: newTodos, category };
    try {
      const response = await api.post("/todo", newTodoItem);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodos("");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <form className="w-full flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
      <section className="mt-7">
        <h1 className="text-2xl sm:text-3xl dark:text-white duration-500 ease">CREATE A TODO</h1>
      </section>
      <p className="mt-2 text-[#888] font-bold">What's on your todo list?</p>
      <input
        className="mt-1 h-10 w-full rounded-md px-4 py-6 font-semibold text-xl border-none outline-none"
        placeholder="e.g Cook the cat"
        type="text"
        name="todo_input"
        id="todo_input"
        value={newTodos}
        onChange={(e) => setNewTodos(e.target.value)}
      />
      <p className="mt-2 text-[#888] font-bold">Pick A Category</p>
      <section className="w-full flex gap-x-5 items-center justify-around mt-3">
        <section className="flex-1 flex flex-col gap-y-2 p-7 bg-white items-center rounded-md hover:shadow-xl hover:scale-105 duration-500 ease-in-out">
          <input
            className="accent-slate-900 cursor-pointer"
            type="radio"
            name="category"
            id="business"
            value="business"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label className="text-gray-500 font-semibold cursor-pointer hover:text-gray-700" htmlFor="business">
            Business
          </label>
        </section>
        <section className="flex-1 flex flex-col gap-y-2 p-7 bg-white items-center rounded-md hover:shadow-xl hover:scale-105 duration-500 ease-in-out">
          <input
            className="accent-slate-900 cursor-pointer"
            type="radio"
            name="category"
            id="personal"
            value="personal"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label className="text-gray-500 font-semibold cursor-pointer hover:text-gray-700" htmlFor="personal">
            Personal
          </label>
        </section>
      </section>
      <button
        className="mt-4 bg-slate-600 p-3 font-bold text-white rounded-md w-full hover:bg-slate-900 dark:hover:bg-slate-700"
        type="button"
        onClick={addTodos}
      >
        ADD TODO
      </button>
    </form>
  );
};

export default TodoInput;
