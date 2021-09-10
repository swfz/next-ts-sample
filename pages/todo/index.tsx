import type { NextPage } from 'next'
import { useState } from 'react';
import styles from '../../styles/Home.module.css'

interface Todo {
  name: string;
  done: boolean;
}

interface TodoItem {
  todo: Todo;
}

const TodoItem = (props: TodoItem) => {
  const todo = props.todo;

  const [checked, setChecked] = useState(false);
  const className = checked ? styles.done : styles.undone;

  const doneFn = (event) => {
    setChecked(!checked)
  }
  return (
    <>
      <div className={className}>
        <input type="checkbox" name={props.todo.name} onChange={doneFn} checked={checked}/>
        <label for={todo.name}>{props.todo.name}</label>
      </div>
    </>
  )
}

const Todo: NextPage = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState();

  const addFn = (event) => {
    console.log(event);

    console.log(text);
    setTodos([...todos,{name: text, done: false}]);
    setText('')
  }

  return (
    <>
      <div>ToDo List</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <input type="submit" value="Add" onClick={addFn} />
      </form>

      {todos.map((todo: Todo) => {
        return <TodoItem todo={todo}></TodoItem>
      })}
    </>
  )
}

export default Todo