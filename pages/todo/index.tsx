import type { NextPage } from 'next'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRecoilState } from 'recoil'
import { todoListState } from '../../src/atoms/TodoListAtoms'
import styles from '../../styles/Home.module.css'

interface Todo {
  id: string;
  name: string;
  done: boolean;
}

interface TodoItem {
  todo: Todo;
}

const TodoItem = (props: TodoItem) => {
  const todo = props.todo;

  const [todos, setTodos] = useRecoilState(todoListState);
  const [checked, setChecked] = useState(false);
  const className = checked ? styles.done : styles.undone;

  const doneFn = (event) => {
    setChecked(!checked)
    setTodos((beforeTodos) => {
      const newTodos = beforeTodos.reduce((acc, t) => {
        const item = t.id === todo.id ? {...t, done: !t.done} : t;

        return [...acc, item];
      }, []);

      return newTodos;
    });
  }
  return (
    <>
      <div className={className}>
        <input id={props.todo.id} type="checkbox" name={props.todo.name} onChange={doneFn} checked={checked}/>
        <label for={props.todo.id}>{props.todo.name}</label>
      </div>
    </>
  )
}

const Todo: NextPage = () => {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [text, setText] = useState<string>();

  const todoCount = todos.filter(t => !t.done).length;
  const doneCount = todos.filter(t => t.done).length;
  const characterCount = text ? text.length : 0;

  const addFn = (event) => {
    console.log(event);

    console.log(text);
    setTodos([...todos, {id: uuid(), name: text, done: false}]);
    setText('')
  }

  return (
    <>
      <div>ToDo List</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="Add" onClick={addFn} />
      </form>
      <p>文字数: { characterCount }</p>
      <div>todo: {todoCount}, done: {doneCount}</div>

      {todos.map((todo: Todo) => {
        return <TodoItem todo={todo}></TodoItem>
      })}
    </>
  )
}

export default Todo