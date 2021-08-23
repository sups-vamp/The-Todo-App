import React,{useRef} from "react";
import "./CompletedTodo.css";

export default function CompletedTodo(props) {
    const refTodo = useRef('');
    const handleAdd=()=>{
        props.Add(refTodo.current.innerHTML);
      }
  return (
    <div class="completed-tasks-main">
      <i className="fa fa-ellipsis-v"></i>
      <i className="fa fa-ellipsis-v"></i>
      <input type="radio" name="todo" onClick={handleAdd}></input>
      <h4 class="completed-item" ref={refTodo}>{props.completedItem}</h4>
      <i className="fa fa-circle"></i>
      <span className="date-completion">Task finished : {props.dateCompletion}</span>
    </div>
  );
}
