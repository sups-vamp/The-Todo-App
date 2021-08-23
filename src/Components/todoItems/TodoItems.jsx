import React from "react";
import "./TodoItems.css";
import { useState } from "react";
import Modal from "../userInput/UserInput";
import ModalDatePicker from "../datePicker/ModalDatePicker";
import { dateFormatter } from "../../utils/dateFormatter";

export default function TodoItems(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false);

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

  const addDate = (dateparam, dayparam) => {
    closeModalDate();
    props.Edit(props.sno,props.comment,dateparam,dayparam);
  };
  const addComment = (todo,text,day,date) => {
    closeModal();
    props.Edit(props.sno,text,props.reminder,props.day);
  };

  const handleDelete = () => {
   props.deleteTodo(props.sno);
  }

  const handleClick = () => {
    const completedDate = new Date();
    props.completed(props.sno,props.todoItem, dateFormatter(completedDate)[0]);
  }

  return (
    <div className="item">
      <i className="fa fa-ellipsis-v"></i>
      <i className="fa fa-ellipsis-v"></i>
      <input type="radio" name="todo" onClick={handleClick}></input>
      <div class="info">
        <h4>{props.sno}{props.todoItem}</h4>
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
              <button className="dropdown-item" href="#" onClick={handleDelete}>
                Delete
              </button>
              <button className="dropdown-item" href="#" onClick={openModalDate}>
                Add/Edit reminder
              </button>
              <button className="dropdown-item" href="#" onClick={openModal}>
                Add/Edit Comment
              </button>
              <ModalDatePicker
                isOpen={dateModalIsOpen}
                handlePromptOpen={closeModalDate}
                AddDate={addDate}
              ></ModalDatePicker>
              <Modal
                isOpen={modalIsOpen}
                handlePromptOpen={closeModal}
                Add={addComment}
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
