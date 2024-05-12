import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  document.body.classList = isDark ? "body-dark" : "body";

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
        <input type="text" placeholder="Create a new todo…" />
      </div>
      <ul className="container-todos">
        <li className="li">
          <img src="./img/icons/circle.svg" alt="circle" className="circle" />
          <img
            src="./img/icons/circle-dark.svg"
            alt="circle dark"
            className="circle-dark"
          />
          <img
            src="./img/icons/circle-hover.svg"
            alt="circle hover"
            className="circle-hover"
          />
          <img
            src="./img/icons/checked.svg"
            alt="checked"
            className="checked"
          />
          <p>someting</p>
          <img src="./img/icons/remove.svg" alt="remove" className="remove" />
        </li>
      </ul>
      <div className="settings">
        <div className="todo-count">5 items left</div>
        <div className="todo-filter">
          <span className="todo-filter_active all-filter">All</span>
          <span className="todo-filter_hover active-filter">Active</span>
          <span className="completed-filter">Completed</span>
        </div>
        <div className="todo-clear">Clear Completed</div>
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
/*

console.log(str);

*/
