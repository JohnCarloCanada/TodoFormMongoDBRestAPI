import React, { useContext, useState, useEffect } from "react";
import DataContext from "../context/DataContext";
import api from "../api/todo";

const TodoEditModal = () => {
  const { modalOpen, setModalOpen, editID, todos, setTodos } = useContext(DataContext);
  const [editTodo, setEditTodo] = useState("");

  const todo = todos.filter((todo) => todo._id === editID);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setEditTodo(todo[0].todo);

    return () => (isMounted = false);
  }, []);

  const addEditItem = async (id) => {
    if (!editTodo.trim() || editTodo.trim() === " ") {
      setModalOpen(!modalOpen);
      document.body.style.overflow = "inherit";
      setEditTodo("");
      return null;
    }
    try {
      const response = await api.put(`todo/${id}`, {
        todo: editTodo,
      });
      const todoList = todos.map((todo) => (todo._id === response.data._id ? { ...todo, todo: editTodo } : todo));
      setTodos(todoList);
      setModalOpen(!modalOpen);
      document.body.style.overflow = "inherit";
      setEditTodo("");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <section className="w-full">
      <div
        className="fixed flex items-center justify-center w-full min-h-screen top-0 left-0 bg-black/80"
        onClick={(e) => {
          setModalOpen(!modalOpen);
          document.body.style.overflow = "inherit";
          setEditTodo("");
        }}
      ></div>
      <form
        className="fixed w-[70%] z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3 className="text-center text-white font-bold text-4xl mb-1">EDIT TODO</h3>
        <input
          className="w-full h-10 border-none outline-none rounded-md p-5 font-bold"
          type="text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          placeholder="EDIT TODO"
        />
        <button
          className="py-2 px-4 rounded-md text-white bg-gray-600 font-bold w-full mt-2 hover:bg-gray-800"
          type="button"
          onClick={() => addEditItem(editID)}
        >
          submit
        </button>
      </form>
    </section>
  );
};

export default TodoEditModal;
