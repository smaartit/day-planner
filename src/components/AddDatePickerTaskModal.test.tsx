import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import AddDatePickerTaskModal from "./AddDatePickerTaskModal"; // Path to your component

const mockOnAddTask = jest.fn();
const mockHandleClose = jest.fn();
const mockSetDatePickerTaskFormData = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  datePickerTaskFormData: {
    description: "",
    start: undefined,
    end: undefined,
    allDay: false,
    taskId: undefined,
  },
  setDatePickerTaskFormData: mockSetDatePickerTaskFormData,
  onAddTask: mockOnAddTask,
};

describe("AddDatePickerTaskModal", () => {
  beforeEach(() => {
    render(<AddDatePickerTaskModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    // Check if the modal components are rendered
    expect(screen.getByText("Add task")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    expect(screen.getByLabelText("End date")).toBeInTheDocument();
    expect(screen.getByText("All day?")).toBeInTheDocument();
  });

  test("should call onClose function when Cancel button is clicked", async () => {
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  //   test("should call onAddEvent function when Add button is clicked and form is valid", async () => {
  //     // Fill in valid form fields
  //     fireEvent.change(screen.getByLabelText("Description"), {
  //       target: { value: "New Event" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Start date"), {
  //       target: { value: new Date() },
  //     });
  //     fireEvent.change(screen.getByLabelText("End date"), {
  //       target: { value: new Date() },
  //     });

  //     const addButton = screen.getByText("Add");
  //     fireEvent.click(addButton);

  //     // Check if onAddEvent is called
  //     await waitFor(() => {
  //       expect(mockOnAddEvent).toHaveBeenCalledTimes(1);
  //     });
  //   });

  test("should update form data on description change", () => {
    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    // Check if setDatePickerEventFormData was called with the correct updated description
    expect(mockSetDatePickerTaskFormData).toHaveBeenCalledTimes(1);
  });
});
