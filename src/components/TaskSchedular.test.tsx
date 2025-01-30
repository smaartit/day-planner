import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskSchedular from "./TaskSchedular";

describe("TaskSchedular", () => {
  beforeEach(() => {
    render(<TaskSchedular />);
  });

  test("should render calendar components correctly", () => {
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(
      screen.getByText("Staying on Top of My To-Do List")
    ).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  test("should open AddTaskModal when Add task button is clicked", () => {
    fireEvent.click(screen.getByText("Add task", { exact: false }));
    expect(
      screen.getByText("To add a task, please fill in the information below.")
    ).toBeInTheDocument();
  });

  // test("should add an task when onAddTask is called", () => {
  //   fireEvent.click(screen.getByText("Add Task", { exact: false }));
  //   fireEvent.change(screen.getByLabelText("Description", { exact: false }), {
  //     target: { value: "New Task" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Start Date", { exact: false }), {
  //     target: { value: new Date(2025, 1, 1, 0, 0) },
  //   });
  //   fireEvent.change(screen.getByLabelText("End Date", { exact: false }), {
  //     target: { value: new Date(2025, 1, 1, 0, 5) },
  //   });
  //   fireEvent.click(screen.getByText("Add"));
  //   expect(screen.getByText("New Task", { exact: false })).toBeInTheDocument();
  // });

  //   test("should delete an task when onDeleteTask is called", () => {
  //     fireEvent.click(screen.getByText("Add task"));
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
  //     fireEvent.click(screen.getByText("Delete Task"));
  //     expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
  //   });

  test("should close AddTaskModal when handleClose is called", () => {
    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(
      screen.queryByText("To add a task, please fill in the information below")
    ).not.toBeInTheDocument();
  });

  test("should close AddDatePickerTaskModal when handleDatePickerClose is called", () => {
    fireEvent.click(screen.getByText("Add Task"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(
      screen.queryByText("To add a task, please fill in the information below")
    ).not.toBeInTheDocument();
  });
});
