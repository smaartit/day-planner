import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import { AddTodoModal } from "./AddTodoModal"; // Path to your component

const mockHandleClose = jest.fn();
const mockSetTodos = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  todos: [
    { _id: "1", title: "Todo 1", color: "#ff0000" },
    { _id: "2", title: "Todo 2", color: "#00ff00" },
  ],
  setTodos: mockSetTodos,
};

describe("AddTodoModal", () => {
  beforeEach(() => {
    render(<AddTodoModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Add todo")).toBeInTheDocument();
    expect(
      screen.getByText("Create todos to add to your Calendar.")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Title", { exact: false })
    ).toBeInTheDocument();
  });

  test("should call handleClose function when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should call setTodos function when Add button is clicked", () => {
    const titleInput = screen.getByLabelText("Title", { exact: false });
    fireEvent.change(titleInput, {
      target: { value: "New Todo" },
    });
    fireEvent.click(screen.getByText("Add"));
    expect(mockSetTodos).toHaveBeenCalledTimes(1);
  });
});
