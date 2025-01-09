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
    color: "",
  },
  setEventFormData: mockSetEventFormData,
  onAddEvent: mockOnAddEvent,
};

describe("AddEventModal", () => {
  beforeEach(() => {
    render(<AddEventModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Add event")).toBeInTheDocument();
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
    expect(mockSetEventFormData).toHaveBeenCalledTimes(4);
  });
});
