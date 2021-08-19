import React from "react";
import "./TodoScreen.css";
import { useState } from "react";
import Modal from "../userInput/UserInput";
import TodoItems from "../todoItems/TodoItems";
import CompletedTodo from "../completedItems/CompletedTodo";

export default function TodoScreen() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const addTodo = (todo) => {
    let sno;
    closeModal();

    if (todos.length === 0) sno = 0;
    else sno = todos[todos.length - 1].sno + 1;

    const myTodo = {
      sno: sno,
      desc: todo,
    };
    setTodos([...todos, myTodo]);
    setCompletedItems(
      completedItems.filter((completedItem) => {
        return completedItem !== todo;
      })
    );
  };

  const deleteTodo = (todoName) => {
    setTodos(
      todos.filter((todo) => {
        return todo.desc !== todoName;
      })
    );
  };

  const completedTodo = (doneItem) => {
    setCompletedItems([...completedItems, doneItem]);
    setTodos(
      todos.filter((todo) => {
        return todo.desc !== doneItem;
      })
    );
  };

  const search = (e) => {
    setSearchVal(e.target.value);
 }

  return (
    <div className="container-fluid">
      <header>
        <div className="row">
          <div className="col-lg-12 navbar"></div>
        </div>
      </header>
      <div className="app-body">
        <div className="row heading">
          <div className="col-lg-8 align-left">
            <h1>To Do List</h1>
          </div>
          <div className="col-lg-4 align-right">
            <button type="button" className="btn" onClick={openModal}>
              Add To Do
            </button>
            <Modal
              isOpen={modalIsOpen}
              handlePromptOpen={closeModal}
              text="Todo"
              Add={addTodo}
              option="addTodoOption"
            ></Modal>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="search">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input onChange={search}
                className="input-field"
                type="text"
                placeholder="Search To Do..."
              />
            </div>
          </div>
        </div>
        <div className="container-box">
          <div className="title">To do</div>
          <hr></hr>
          {todos.filter((val) => {
            if(searchVal === ""){
              return val
            }else if (val.desc.toLowerCase().includes(searchVal.toLowerCase())){
              return val
            }
          }).map((todo) => (
            <TodoItems
              todoItem={todo.desc}
              deleteTodo={deleteTodo}
              completed={completedTodo}
            />
          ))}
        </div>
        <hr></hr>
        <div className="container-box">
          <div className="title">Completed</div>
          <hr></hr>
          {completedItems.map((completedItem) => (
            <CompletedTodo completedItem={completedItem} Add={addTodo}/>
          ))}
        </div>
      </div>
    </div>
  );
}