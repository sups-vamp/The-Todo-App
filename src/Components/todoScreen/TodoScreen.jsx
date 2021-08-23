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
  const [completionDate, setCompletionDate]=useState('');
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const addTodo = (todo, comment, date, day) => {
    let sno;
    closeModal();

    if (todos.length === 0) sno = 0;
    else sno = todos[todos.length - 1].sno + 1;

    const myTodo = {
      sno: sno,
      desc: todo,
      notes: comment,
      reminder:date,
      day: day
    };
    setTodos([...todos, myTodo]);
    setCompletedItems(
      completedItems.filter((completedItem) => {
        return completedItem !== todo;
      })
    );
  };

  const editTodo = (sno,comment,date,day) => {
    const tempTodos = todos;
    tempTodos.map(t => {
      if(t.sno === sno){
        t.notes = comment;
        t.reminder = date;
        t.day = day;
      }
    })
    setTodos(tempTodos);
  }

  const deleteTodo = (todoSno) => {
    setTodos(
      todos.filter((todo) => {
        return todo.sno !== todoSno;
      })
    );

    for(let i=todoSno;i<todos.length-1;i++){
      todos[i+1].sno = i;
    }
  };

  const completedTodo = (doneItemSno,taskName,completedDate) => {
    setCompletionDate(completedDate);
    setCompletedItems([...completedItems,taskName]);
    setTodos(
      todos.filter((todo) => {
        return todo.sno !== doneItemSno;
      })
    );
    for(let i=doneItemSno;i<todos.length-1;i++){
      todos[i+1].sno = i;
    }
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
          <div className="title">TO DO</div>
          <hr></hr>
          {todos.filter((val) => {
            if(searchVal === ""){
              return val
            }else if (val.desc.toLowerCase().includes(searchVal.toLowerCase())){
              return val
            }
          }).map((todo) => (
            <TodoItems
              sno={todo.sno}
              todoItem={todo.desc}
              comment={todo.notes}
              reminder={todo.reminder}
              day={todo.day}
              deleteTodo={deleteTodo}
              completed={completedTodo}
              Add={addTodo}
              Edit={editTodo}
            />
          ))}
        </div>
        <hr></hr>
        <div className="container-box">
          <div className="title">COMPLETED</div>
          <hr></hr>
          {completedItems.map((completedItem) => (
            <CompletedTodo completedItem={completedItem} Add={addTodo} dateCompletion={completionDate}/>
          ))}
        </div>
      </div>
    </div>
  );
}
