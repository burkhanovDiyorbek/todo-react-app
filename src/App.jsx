import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { Reorder } from "framer-motion";
import { Modal } from "./Modal";
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
  const [showModal, setShowModal] = useState(false);

  document.body.classList = isDark ? "body-dark" : "body";

  if (showModal) {
    document.body.style = "overflow:hidden;";
    window.scrollTo(0, 0);
  } else {
    document.body.style = "overflow:visible;";
  }

  const sendData = (obj) => {
    setToDo((prev) => [...prev, obj]);
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
    e.preventDefault();
    if (e.target.children[0].value.trim().length) {
      sendData({
        id: uuid(),
        title: e.target.children[0].value,
        isComplete: false,
      });
    }
    e.target.children[0].value = "";
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosArr));
  }, [todosArr]);
  return (
    <>
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
        <Reorder.Group
          className="container-todos"
          values={todosArr}
          onReorder={setToDo}
          axis="y"
          as="ul"
        >
          {todosArr.filter((item) =>
            filter == "all"
              ? item
              : filter == "completed"
              ? item.isComplete
              : !item.isComplete
          ).length ? (
            todosArr
              .filter((item) =>
                filter == "all"
                  ? item
                  : filter == "completed"
                  ? item.isComplete
                  : !item.isComplete
              )
              .map((item) => {
                return (
                  <Reorder.Item
                    className={item.isComplete ? "li completed" : "li"}
                    value={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    as="li"
                    key={item.id}
                  >
                    <img
                      src="./img/icons/circle.svg"
                      alt="circle"
                      className="circle"
                    />
                    <img
                      src="./img/icons/circle-dark.svg"
                      alt="circle dark"
                      className="circle-dark"
                      onClick={() => changeIsComp(item.id)}
                    />
                    <img
                      src="./img/icons/circle-hover.svg"
                      alt="circle hover"
                      className="circle-hover"
                      onClick={() => changeIsComp(item.id)}
                    />
                    <img
                      src="./img/icons/checked.svg"
                      alt="checked"
                      className="checked"
                      onClick={() => changeIsComp(item.id)}
                    />
                    <p onClick={() => setShowModal(true)}>{item.title}</p>
                    <img
                      onClick={() => removeData(item.id)}
                      src="./img/icons/remove.svg"
                      alt="remove"
                      className="remove"
                    />
                    {showModal && (
                      <Modal
                        id={item.id}
                        value={item.title}
                        setShowModal={setShowModal}
                        setToDos={setToDo}
                      />
                    )}
                  </Reorder.Item>
                );
              })
          ) : (
            <li className="li">nothing to see...</li>
          )}
        </Reorder.Group>
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
          <span
            className="todo-filter--mob_active"
            onClick={() => setFilter("all")}
          >
            All
          </span>
          <span onClick={() => setFilter("active")}>Active</span>
          <span onClick={() => setFilter("completed")}>Completed</span>
        </div>
        <p className="container-footer">Drag and drop to reorder list</p>
      </div>
    </>
  );
}
export default App;
