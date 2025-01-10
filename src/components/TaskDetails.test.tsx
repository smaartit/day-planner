import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import TaskDetails from "./TaskDetails";
import { ITaskDetails } from "./TaskSchedular";

describe("TaskDetails", () => {
  const task: ITaskDetails = {
    _id: "1",
    title: "Sample Task",
    description: "This is a sample task description",
  };

  it("renders the task description", () => {
    const { getByText } = render(<TaskDetails event={task} />);
    expect(getByText("This is a sample task description")).toBeInTheDocument();
  });

  it("handles missing task description", () => {
    const taskWithoutDescription: ITaskDetails = {
      ...task,
      description: "",
    };
    const { queryByText } = render(
      <TaskDetails event={taskWithoutDescription} />
    );
    expect(
      queryByText("This is a sample task description")
    ).not.toBeInTheDocument();
  });
});