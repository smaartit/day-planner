import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import AddEventModal from "./AddEventModal"; // Path to your component

const mockOnAddEvent = jest.fn();
const mockHandleClose = jest.fn();
const mockSetEventFormData = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  eventFormData: {
    description: "",
    taskId: undefined,
  },
  setEventFormData: mockSetEventFormData,
  onAddEvent: mockOnAddEvent,
  tasks: [
    { _id: "1", title: "Task 1" },
    { _id: "2", title: "Task 2" },
  ],
};

describe("AddEventModal", () => {
  beforeEach(() => {
    render(<AddEventModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Add event")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Task")).toBeInTheDocument();
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
    expect(mockSetEventFormData).toHaveBeenCalledTimes(1);
  });

  test("should update form data on task change", () => {
    const taskInput = screen.getByLabelText("Task");
    fireEvent.change(taskInput, {
      target: { value: "Task 1" },
    });
    expect(mockSetEventFormData).toHaveBeenCalledTimes(1);
  });
});
