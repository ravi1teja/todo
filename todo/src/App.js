import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';

function App() {
  const [todo,setTodo]=useState([]);
  const [task,setTask]=useState('');

  useEffect(()=>{
      let todoList=JSON.parse(sessionStorage.getItem('todo'));
      if(todoList){
        setTodo(todoList);
      }
  },[]);
  const handleChange=(e)=>{
      setTask(e.target.value);
  }
  const saveTask=()=>{
      if(task!==''){
        let newTask={title:task,id:new Date(),completed:false};
        setTodo([...todo,newTask]);
        setTask('');
        sessionStorage.setItem('todo',JSON.stringify([...todo,newTask]));
      }
  }
  const handleComplete=(task)=>{
      task.completed=!task.completed;
      sessionStorage.setItem('todo',JSON.stringify(todo));
  }
  const deleteTask=(task)=>{
      const newTodo=todo.filter(x=>x.id!==task.id);
      setTodo(newTodo);
      sessionStorage.setItem('todo',JSON.stringify(newTodo));
  }
  return (
    <div>
      <input type='text' onChange={handleChange} value={task}></input>
      <button onClick={saveTask}>Submit button</button>
      <ul>
        {todo.map(el=> 
        <li key={el.id}>
          <input onChange={()=>{handleComplete(el)}} value={el.title} checked={el.completed} type='checkbox'></input>
        {el.title}
        <button onClick={()=>{deleteTask(el)}}>delete</button>
        </li>)}
      </ul>
     
    </div>
  );
}

export default App;
