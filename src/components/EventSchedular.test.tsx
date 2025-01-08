import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import EventSchedular from "./EventSchedular";

describe("EventSchedular", () => {
  beforeEach(() => {
    render(<EventSchedular />);
  });

  test("should render calendar components correctly", () => {
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(
      screen.getByText("Create Events and Tasks and manage them easily")
    ).toBeInTheDocument();
    expect(screen.getByText("Add event")).toBeInTheDocument();
    expect(screen.getByText("Create task")).toBeInTheDocument();
  });

  test("should open AddEventModal when Add event button is clicked", () => {
    fireEvent.click(screen.getByText("Add event", { exact: false }));
    expect(
      screen.getByText("To add a event, please fill in the information below.")
    ).toBeInTheDocument();
  });

  test("should open AddTaskModal when Create task button is clicked", () => {
    fireEvent.click(screen.getByText("Create task", { exact: false }));
    expect(
      screen.getByText("Create tasks to add to your Calendar.")
    ).toBeInTheDocument();
  });

  //   test("should add an event when onAddEvent is called", () => {
  //     fireEvent.click(screen.getByText("Add event", { exact: false }));
  //     fireEvent.change(screen.getByLabelText("Description", { exact: false }), {
  //       target: { value: "New Event" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Start Date", { exact: false }), {
  //       target: { value: new Date() },
  //     });
  //     fireEvent.change(screen.getByLabelText("End Date", { exact: false }), {
  //       target: { value: new Date() },
  //     });
  //     fireEvent.click(screen.getByText("Add"));
  //     expect(screen.getByText("New Event", { exact: false })).toBeInTheDocument();
  //   });

  //   test("should delete an event when onDeleteEvent is called", () => {
  //     fireEvent.click(screen.getByText("Add event"));
  //     fireEvent.change(screen.getByLabelText("Description"), {
  //       target: { value: "Delete Me" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Start Date", { exact: false }), {
  //       target: { value: new Date() },
  //     });
  //     fireEvent.change(screen.getByLabelText("End Date", { exact: false }), {
  //       target: { value: new Date() },
  //     });
  //     fireEvent.click(screen.getByText("Add"));
  //     fireEvent.click(screen.getByText("Delete Me", { exact: false }));
  //     fireEvent.click(screen.getByText("Delete Event"));
  //     expect(screen.queryByText("Event to Delete")).not.toBeInTheDocument();
  //   });

  test("should close AddEventModal when handleClose is called", () => {
    fireEvent.click(screen.getByText("Add event"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Add Event")).not.toBeInTheDocument();
  });

  test("should close AddDatePickerEventModal when handleDatePickerClose is called", () => {
    fireEvent.click(screen.getByText("Add event"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Add Event")).not.toBeInTheDocument();
  });
});
