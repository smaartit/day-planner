import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import EventDetailsModal from "./EventDetailsModal"; // Path to your component
import { IEventDetails } from "./EventSchedular";

const mockHandleClose = jest.fn();
const mockOnDeleteEvent = jest.fn();

const defaultProps = {
  open: true,
  handleClose: mockHandleClose,
  onDeleteEvent: mockOnDeleteEvent,
  currentEvent: {
    _id: "1",
    title: "Sample Event",
    description: "This is a sample event description",
  } as IEventDetails,
};

describe("EventDetailsModal", () => {
  beforeEach(() => {
    render(<EventDetailsModal {...defaultProps} />);
  });

  test("should render modal components correctly", () => {
    expect(screen.getByText("Event Info")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample event description")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete Event")).toBeInTheDocument();
  });

  test("should call handleClose function when Cancel button is clicked", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("should call onDeleteEvent function when Delete Event button is clicked", () => {
    fireEvent.click(screen.getByText("Delete Event"));
    expect(mockOnDeleteEvent).toHaveBeenCalledTimes(1);
  });
});
