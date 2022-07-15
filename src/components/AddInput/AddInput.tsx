import { useState } from 'react';

interface Iinput {
  setTodo: any;
}

export const AddInput = ({ setTodo }: Iinput) => {
  const [todoValue, setTodoValue] = useState('');
  const submitTodo = () => {
    setTodo(todoValue);
    setTodoValue('');
  };
  return (
    <>
      <input
        onChange={(e) => setTodoValue(e.target.value)}
        value={todoValue}
        type="text"
        placeholder="Add a new task"
      />
      <button
        onClick={() => {
          submitTodo();
        }}
      >
        submit
      </button>
    </>
  );
};
