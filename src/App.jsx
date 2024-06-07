import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";

function App() {
  const [todosArr, setToDo] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  document.body.classList = isDark ? "body-dark" : "body";

  const sendData = (obj) => {
    setToDo((prev) => [obj, ...prev]);
  };

  const removeData = (id) => {
    setToDo((prev) => prev.filter((item) => item.id !== id));
  };

  const changeIsComp = (id) => {
    setToDo((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const formFunc = (e) => {
    const date = new Date();
    e.preventDefault();
    if (e.target.children[0].value.trim().length) {
      sendData({
        id: date.getTime(),
        title: e.target.children[0].value,
        isComplete: false,
      });
    }
    e.target.children[0].value = "";
  };

  const handleSort = (dragPerson, draggedOverPerson) => {
    const todos = [...todosArr];
    const temp = todos[dragPerson.current];
    todos[dragPerson.current] = todos[draggedOverPerson.person];
    todos[draggedOverPerson.current] = temp;
    setToDo(todos);
    console.log(todos, temp, todosArr);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosArr));
  }, [todosArr]);
  return (
    <div className="container">
      <div className="container-header">
        <h2>TODO</h2>
        <img
          src="../img/icons/dark.svg"
          alt="dark"
          id="dark"
          onClick={() => setIsDark(!isDark)}
        />
        <img
          src="../img/icons/light.svg"
          alt="light"
          id="light"
          onClick={() => setIsDark(!isDark)}
        />
      </div>
      <div className="container-todo-input">
        <img src="../img/icons/circle.svg" alt="circle" className="circle" />
        <img
          src="../img/icons/circle-dark.svg"
          alt="circle dark"
          className="circle-dark"
        />
        <form onSubmit={formFunc}>
          <input type="text" placeholder="Create a new todo…" />
        </form>
      </div>
      <ul className="container-todos">
        {todosArr
          .filter((item) =>
            filter == "all"
              ? item
              : filter == "completed"
              ? item.isComplete
              : !item.isComplete
          )
          .map((item, index) => {
            return (
              <TodoItem
                key={index}
                item={item}
                index={index}
                removeData={removeData}
                changeIsComp={changeIsComp}
                handleSort={handleSort}
              />
            );
          })}
          {!todosArr.length && <li className="li">nothing to see...</li>}
      </ul>
      <div className="settings">
        <div className="todo-count">
          {todosArr?.filter((item) => !item.isComplete).length} items left
        </div>
        <div className="todo-filter">
          <span
            className="todo-filter_active all-filter"
            onClick={() => setFilter("all")}
          >
            All
          </span>
          <span
            className="todo-filter_hover active-filter"
            onClick={() => setFilter("active")}
          >
            Active
          </span>
          <span
            className="completed-filter"
            onClick={() => setFilter("completed")}
          >
            Completed
          </span>
        </div>
        <div
          className="todo-clear"
          onClick={() =>
            setToDo((prev) => prev.filter((item) => !item.isComplete))
          }
        >
          Clear Completed
        </div>
      </div>
      <div className="todo-filter todo-filter--mob">
        <span className="todo-filter--mob_active">All</span>
        <span>Active</span>
        <span>Completed</span>
      </div>
      <p className="container-footer">Drag and drop to reorder list</p>
    </div>
  );
}
export default App;
