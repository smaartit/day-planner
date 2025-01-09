import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import AddTaskModal from "./AddTaskModal"; // Path to your component

const mockOnAddTask = jest.fn();
const mockHandleClose = jest.fn();
const mockSetTaskFormData = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  taskFormData: {
    description: "",
    color: "",
  },
  setTaskFormData: mockSetTaskFormData,
  onAddTask: mockOnAddTask,
};

describe("AddTaskModal", () => {
  beforeEach(() => {
    render(<AddTaskModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Add task")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  test("should call onClose function when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should update form data on description change", () => {
    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });
    expect(mockSetTaskFormData).toHaveBeenCalledTimes(4);
  });
});
