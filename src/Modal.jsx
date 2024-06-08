import { useState } from "react";
import PropTypes from "prop-types";

export const Modal = ({ id, value, setToDos, setShowModal }) => {
  const [defVal, setDefVal] = useState(value);
  return (
    <div
      className="modal-container"
      onClick={(e) => e.currentTarget == e.target && setShowModal(false)}
    >
      <div className="modal">
        <input
          type="text"
          value={defVal}
          onInput={(e) => setDefVal(e.target.value)}
        />
        <div className="btns">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className={
              defVal == "" || value != defVal
                ? "submit-btn"
                : "submit-btn disabled"
            }
            onClick={() => {
              setToDos((prevItems) =>
                prevItems.map((item) =>
                  item.id === id ? { ...item, title: defVal } : item
                )
              );
              setShowModal(false);
            }}
            disabled={defVal == "" || value == defVal}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  setToDos: PropTypes.func,
  setShowModal: PropTypes.func,
};
