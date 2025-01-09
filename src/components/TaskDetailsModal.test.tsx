import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskDetailsModal from "./TaskDetailsModal"; // Path to your component
import { ITaskDetails } from "./TaskSchedular";

const mockHandleClose = jest.fn();
const mockOnDeleteTask = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  onDeleteTask: mockOnDeleteTask,
  currentTask: {
    _id: "1",
    title: "Sample Task",
    description: "This is a sample task description",
  } as ITaskDetails,
};

describe("TaskDetailsModal", () => {
  beforeEach(() => {
    render(<TaskDetailsModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Task Detail")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample task description")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete Task")).toBeInTheDocument();
  });

  test("should call handleClose function when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should call onDeleteTask function when Delete Task button is clicked", () => {
    fireEvent.click(screen.getByText("Delete Task"));
    expect(mockOnDeleteTask).toHaveBeenCalledTimes(1);
  });
});
