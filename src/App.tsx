import './App.css';
import { Todo } from './components/Todo/Todo';
import { AddInput } from './components/AddInput/AddInput';
import { useState, useEffect } from 'react';

type ITodoList =
  | {
      id: number;
      title: string;
      completed: boolean;
    }[]
  | [];

function App() {
  useEffect(() => {
    if (localStorage.todoList) setTodos(JSON.parse(localStorage.todoList));
  }, []);

  const [todos, setTodos] = useState<ITodoList>([]);

  const cteateNewList = (text: string) => {
    const newTodo = { id: todos.length + 1, title: text, completed: false };
    setTodos([...todos, newTodo]);
    localStorage.todoList = JSON.stringify([...todos, newTodo]);
  };

  const clearStorage = () => {
    localStorage.todoList = [];
    setTodos([]);
  };
  return (
    <div>
      <AddInput setTodo={cteateNewList} />
      <ul data-testid={'todoList'} className="TodoList">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          );
        })}
      </ul>
      <button onClick={() => clearStorage()}>clear tasks</button>
    </div>
  );
}

export default App;
