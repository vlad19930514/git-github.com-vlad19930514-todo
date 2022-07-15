import { AddInput } from './AddInput';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedSetTodo = jest.fn();
describe('Add input', () => {
  it('should render input', () => {
    render(<AddInput setTodo={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText('Add a new task');
    expect(inputElement).toBeInTheDocument();
  });

  it('should type', () => {
    render(<AddInput setTodo={mockedSetTodo} />);
    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText('Add a new task');
    fireEvent.change(inputElement, { target: { value: 'Go Grocery' } });
    expect(inputElement.value).toBe('Go Grocery');
  });

  it('should have empty input when button is clicked', () => {
    render(<AddInput setTodo={mockedSetTodo} />);
    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText('Add a new task');

    const buttonElement = screen.getByRole('button', { name: 'submit' });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe('');
  });
});
