import { useEffect, useState } from 'react';

interface ItoDo {
  todo: { id: number; title: string; completed: boolean };
}

export const Todo = ({ todo }: ItoDo) => {
  const { title, completed } = todo;
  const [onComplete, setOnComplete] = useState(false);
  useEffect(() => {
    setOnComplete(completed);
  }, [completed]);
  const switchComplete = () => {
    setOnComplete(!onComplete);
  };

  const h1 = <h1>{title}</h1>;

  const text = onComplete ? <s>{h1}</s> : h1;
  return (
    <div onClick={() => switchComplete()} data-testid={'todo-item'}>
      {text}
    </div>
  );
};
