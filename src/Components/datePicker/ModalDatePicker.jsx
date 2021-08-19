import React from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {dateFormatter} from "../../utils/dateFormatter";
import moment from 'moment';

export default function ModalDatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleCloseClick = () => {
    props.handlePromptOpen();
  };
  const handleAdd = () => {
    props.handlePromptOpen();
    props.AddDate(dateFormatter(selectedDate)[0],dateFormatter(selectedDate)[1]);
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.handlePromptOpen}
      className="user-input"
    >
      <div className="msg-box">
        <div className="msg-header">
          <div className="modal-title">
            <h3>Add Reminder!</h3>
          </div>
          <div className="close">
            <button className="close-button" onClick={handleCloseClick}>
              {"x"}
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="message">
          <DatePicker
          placeholderText="Click here to select date and time"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            format={"dd MMMM | HH:mm"}
            minDate={moment().toDate()}
          />
        </div>
        <div className="modal-header">
          <button className="btn" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}
