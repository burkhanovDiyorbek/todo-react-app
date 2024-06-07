import PropTypes from "prop-types";
import { useRef } from "react";

function TodoItem({ item, index, removeData, changeIsComp, handleSort }) {
  const dragPerson = useRef(0);
  const dragOverPerson = useRef(0);

  return (
    <li
      className={item.isComplete ? "li completed" : "li"}
      draggable
      onDragStart={() => (dragPerson.current = index)}
      onDragEnter={() => (dragOverPerson.current = index)}
      onDragEnd={() => handleSort(dragPerson, dragOverPerson)}
      onDragOver={(e) => e.preventDefault()}
    >
      <img src="./img/icons/circle.svg" alt="circle" className="circle" />
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
      <p>{item.title}</p>
      <img
        onClick={() => removeData(item.id)}
        src="./img/icons/remove.svg"
        alt="remove"
        className="remove"
      />
    </li>
  );
}
export default TodoItem;

TodoItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  removeData: PropTypes.func,
  changeIsComp: PropTypes.func,
  handleSort: PropTypes.func,
};
