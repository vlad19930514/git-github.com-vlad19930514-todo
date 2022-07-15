import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import App from './App';

afterEach(() => {
  localStorage.todoList = [];
});

const addTasks = (tasks: string[]) => {
  const buttonElement = screen.getByRole('button', { name: 'submit' });
  const inputElement: HTMLInputElement =
    screen.getByPlaceholderText('Add a new task');
  tasks.forEach((tasks) => {
    fireEvent.change(inputElement, { target: { value: tasks } });
    fireEvent.click(buttonElement);
  });
};

describe('Should create todo', () => {
  it('should render new todo tasks after add', () => {
    render(<App />);
    addTasks(['Go Grocery', 'hello']);
    expect(screen.getByText(/Go Grocery/i)).toBeInTheDocument();
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('check length of tasks', () => {
    render(<App />);
    addTasks(['Go Grocery', 'hello', 'world']);
    expect(screen.getAllByTestId('todo-item').length).toBe(3);
  });
});

describe('testing switch complete', () => {
  it('should be default not complete', () => {
    render(<App />);
    addTasks(['Go shopping']);
    const todoElement = screen.getByTestId('todo-item');
    expect(todoElement).toContainHTML(
      '<div data-testid="todo-item"><h1>Go shopping</h1></div>'
    );
  });

  it('should switch complete', () => {
    render(<App />);
    addTasks(['Go home']);
    const todoElement = screen.getByTestId('todo-item');
    // first switch
    fireEvent.click(todoElement);
    expect(todoElement).toContainHTML('s');
    // second switch
    fireEvent.click(todoElement);
    expect(todoElement).toContainHTML(
      '<div data-testid="todo-item"><h1>Go home</h1></div>'
    );
  });
});

const mockedLocalStorage = () => {
  const todo = [
    { id: 1, title: 'dasfsg', completed: false },
    { id: 2, title: 'Go Grocery', completed: false },
  ];
  localStorage.todoList = JSON.stringify(todo);
};
describe('test localStorage', () => {
  it('should set the default value from localStorage if it exists', () => {
    mockedLocalStorage();
    render(<App />);
    const todoList = screen.getAllByTestId('todo-item');
    expect(todoList.length).toBe(2);
    expect(todoList[1].innerHTML).toBe('<h1>Go Grocery</h1>');
  });

  it('should update localStorage when state changes', () => {
    mockedLocalStorage();
    render(<App />);
    addTasks(['Go Grocery', 'hello', 'word']);
    const newValue = JSON.parse(localStorage.todoList);
    expect(newValue.length).toBe(5);
    expect(newValue[2].title).toBe('Go Grocery');
  });
  it('should clear localStorage on click', () => {
    //create list
    mockedLocalStorage();
    render(<App />);
    addTasks(['Go Grocery', 'hello', 'word']);

    //check storage
    const StorageValue = JSON.parse(localStorage.todoList);
    expect(StorageValue.length).toBe(5);

    const clearButton = screen.getByRole('button', { name: 'clear tasks' });
    fireEvent.click(clearButton);

    const newStorageValue = Boolean(localStorage.todoList);
    expect(newStorageValue).toBe(false);
  });
});
