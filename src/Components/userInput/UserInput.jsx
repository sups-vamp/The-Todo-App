import React from "react";
import Modal from "react-modal";
import "./UserInput.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {dateFormatter} from "../../utils/dateFormatter";
import moment from 'moment';

//addTodoOption
//addCommentOption

export default function UserInput(props) {
  const handleCloseClick = () => {
    props.handlePromptOpen();
  };

  const onChangeTodo = (e) => {
    setTodoItem(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const handleAdd = () => {
    props.Add(todoItem,comment,dateFormatter(selectedDate)[0],dateFormatter(selectedDate)[1]);
  };

  const [todoItem, setTodoItem] = useState("");
  const [comment, setComment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.handlePromptOpen}
      className="user-input"
    >
      <div className="msg-box">
        <div className="msg-header">
          <div className="modal-title">
            <h3>Add a {props.text}!</h3>
          </div>
          <div className="close">
            <button className="close-button" onClick={handleCloseClick}>
              {"x"}
            </button>
          </div>
        </div>
        <hr></hr>

        {/* --------All Options--------- */}
        {props.option === "addTodoOption" ? (
          <div className="message">
            <label>Add the title of your task:</label>
            <input
              type="text"
              className="input-field"
              onChange={onChangeTodo}
              value={todoItem}
            ></input>
            <label>Add a comment/description for your task:</label>
            <input type="text" className="input-field" onChange={onChangeComment}
              value={comment}></input>
            <label>Select a date as a reminder:</label>
            <DatePicker
              placeholderText="Click here to select date and time"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              format={"dd MMMM | HH:mm"}
              minDate={moment().toDate()}
            />
          </div>
        ) : null}

        {/* -------Only Comments--------- */}
        {props.option === "addCommentOption" ? (
          <div className="message">
            <label>Add a comment/description for your task:</label>
            <input
              type="text"
              className="input-field"
              onChange={onChangeComment}
              value={comment}
            ></input>
          </div>
        ) : null}

        <div className="modal-header">
          <button className="btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}
