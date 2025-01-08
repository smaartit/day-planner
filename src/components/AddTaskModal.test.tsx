import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import { AddTaskModal } from "./AddTaskModal";

const mockHandleClose = jest.fn();
const mockSetTasks = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  tasks: [
    { _id: "1", title: "Task 1", color: "#ff0000" },
    { _id: "2", title: "Task 2", color: "#00ff00" },
  ],
  setTasks: mockSetTasks,
};

describe("AddTaskModal", () => {
  beforeEach(() => {
    render(<AddTaskModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Add a task")).toBeInTheDocument();
    expect(
      screen.getByText("Create tasks to add to your Calendar.")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Title", { exact: false })
    ).toBeInTheDocument();
  });

  test("should call handleClose function when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should call setTasks function when Add button is clicked", () => {
    const titleInput = screen.getByLabelText("Title", { exact: false });
    fireEvent.change(titleInput, {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(mockSetTasks).toHaveBeenCalledTimes(1);
  });
});
