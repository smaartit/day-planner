import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import AddDatePickerEventModal from "./AddDatePickerEventModal"; // Path to your component

const mockOnAddEvent = jest.fn();
const mockHandleClose = jest.fn();
const mockSetDatePickerEventFormData = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  datePickerEventFormData: {
    description: "",
    start: undefined,
    end: undefined,
    allDay: false,
    todoId: undefined,
  },
  setDatePickerEventFormData: mockSetDatePickerEventFormData,
  onAddEvent: mockOnAddEvent,
  todos: [
    { _id: "1", title: "Todo 1" },
    { _id: "2", title: "Todo 2" },
  ],
};

describe("AddDatePickerEventModal", () => {
  beforeEach(() => {
    render(<AddDatePickerEventModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    // Check if the modal components are rendered
    expect(screen.getByText("Add event")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    expect(screen.getByLabelText("End date")).toBeInTheDocument();
    expect(screen.getByText("All day?")).toBeInTheDocument();
    expect(screen.getByLabelText("Todo")).toBeInTheDocument();
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
    expect(mockSetDatePickerEventFormData).toHaveBeenCalledTimes(1);
  });
});
