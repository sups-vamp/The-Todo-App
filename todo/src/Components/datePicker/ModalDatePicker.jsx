import React from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalDatePicker(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleCloseClick = () => {
    props.handlePromptOpen();
  };
  const handleAdd = () => {
    props.handlePromptOpen();
    let day;
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let hours = selectedDate.getHours();
    let minutes = selectedDate.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    const today = new Date();
    var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      day = "Today";
    } else if (
      selectedDate.getFullYear() === tomorrow.getFullYear() &&
      selectedDate.getMonth() === tomorrow.getMonth() &&
      selectedDate.getDate() === tomorrow.getDate()
    ) {
      day = "Tomorrow";
    } else {
      day = days[selectedDate.getDay()];
    }
    const d = `${day} ${strTime}`;
    props.AddDate(d,day);
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
