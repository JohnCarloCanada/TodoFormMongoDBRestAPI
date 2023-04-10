import React, { useState, useEffect } from "react";
import { useTailwindDarkMode } from "../hooks";

const TodoHeader = () => {
  const [userName, setUserName] = useState(localStorage.getItem("username") || "");
  const [theme, toggleDarkMode] = useTailwindDarkMode();

  useEffect(() => {
    localStorage.setItem("username", userName);
  }, [userName]);

  return (
    <header className="w-full flex items-center justify-between ">
      <div className="flex flex-wrap">
        <h2 className="text-[#112A46] dark:text-[#A9C7EA] duration-500 ease font-bold text-2xl sm:text-3xl whitespace-nowrap mr-2">What's up, </h2>
        <input
          className="w-40 text-[#112A46] dark:text-[#A9C7EA]  ease font-bold text-2xl sm:text-3xl whitespace-nowrap border-none outline-none bg-transparent duration-500 ease"
          type="text"
          placeholder="Name Here"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <span
        className={
          theme === "dark"
            ? "cursor-pointer bg-slate-400 dark:bg-[#082032] min-w-[48px] h-6 rounded-xl relative before:absolute before:w-5 before:h-5 before:rounded-full before:bg-slate-200 before:top-[50%] before:translate-y-[-50%] before:left-1 before:duration-500 before:ease"
            : "cursor-pointer bg-yellow-600 min-w-[48px] h-6 rounded-xl relative before:absolute before:w-5 before:h-5 before:rounded-full before:bg-slate-200 before:top-[50%] before:translate-y-[-50%] before:left-6 before:duration-500 before:ease"
        }
        onClick={toggleDarkMode}
      ></span>
    </header>
  );
};

export default TodoHeader;
