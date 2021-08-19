import React from "react";
import "./TodoItems.css";
import { useState, useRef } from "react";
import Modal from "../userInput/UserInput";
import ModalDatePicker from "../datePicker/ModalDatePicker";

export default function TodoItems(props) {
  const [selected, setSelected] = useState("");
  const [comment, setComment] = useState("");
  const [reminder, setReminder] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false);
  const [day,setDay]= useState("");
  const refTodo = useRef('');
  const openModal = () => {
    setModalIsOpen(true);
  };
  const openModalDate = () => {
    setDateModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeModalDate = () => {
    setDateModalIsOpen(false);
  };

  const addDate = (date, day) => {
    setReminder(date);
    setDay(day);
  };
  const addTodo = (text) => {
    setComment(text);
    closeModal();
  };

  const handleDelete = () => {
   props.deleteTodo(refTodo.current.innerHTML);
  }

  const handleClick = () => {
    setSelected(refTodo.current.innerHTML);
    props.completed(refTodo.current.innerHTML);
  }
  return (
    <div className="item">
      <i className="fa fa-ellipsis-v"></i>
      <i className="fa fa-ellipsis-v"></i>
      <input type="radio" name="todo" onClick={handleClick}></input>
      <div class="info">
        <h4 ref={refTodo}>{props.todoItem}</h4>
        <h5 className="comment">{props.comment}</h5>
        <h6><span className={props.day === "" || props.day === undefined? "none":(props.day === 'Today'? "green":(props.day === 'Tomorrow'? "yellow":"red"))}></span><span className="reminder">{props.reminder}</span></h6>
      </div>
      <div className="edit-buttons">
        <div
          className="btn-group"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button type="button" className="btn btn-secondary" disabled>
            Edit
          </button>

          <div className="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a className="dropdown-item" href="#" onClick={handleDelete}>
                Delete
              </a>
              <a className="dropdown-item" href="#" onClick={openModalDate}>
                Add/Edit reminder
              </a>
              <a className="dropdown-item" href="#" onClick={openModal}>
                Add/Edit Comment
              </a>
              <ModalDatePicker
                isOpen={dateModalIsOpen}
                handlePromptOpen={closeModalDate}
                AddDate={addDate}
              ></ModalDatePicker>

              <Modal
                isOpen={modalIsOpen}
                handlePromptOpen={closeModal}
                Add={addTodo}
                text="Comment"
                option="addCommentOption"
              ></Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
