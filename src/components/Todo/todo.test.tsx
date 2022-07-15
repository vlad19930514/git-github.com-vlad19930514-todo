import { Todo } from './Todo';
import { render, screen } from '@testing-library/react';

describe('todo list testing', () => {
  it('should render non-completed todo component', () => {
    const todo = { id: 1, title: 'dasfsg', completed: false };

    render(<Todo todo={todo} />);

    const todoElement = screen.getByTestId('todo-item');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('dasfsg');

    expect(todoElement).toContainHTML(
      '<div data-testid="todo-item"><h1>dasfsg</h1></div>'
    );
  });

  it('should render completed todo component', () => {
    const todo = { id: 2, title: 'dasfsg', completed: true };

    render(<Todo todo={todo} />);

    const todoElement = screen.getByTestId('todo-item');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement).toHaveTextContent('dasfsg');
    expect(todoElement).toContainHTML('s');
  });
});
