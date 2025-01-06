import { render } from "@testing-library/react";
import EventDetails from "./EventDetails";
import { IEventDetails } from "./EventSchedular";

describe("EventDetails", () => {
  const event: IEventDetails = {
    _id: "1",
    title: "Sample Event",
    description: "This is a sample event description",
  };

  it("renders the event description", () => {
    const { getByText } = render(<EventDetails event={event} />);
    expect(getByText("This is a sample event description")).toBeInTheDocument();
  });

  it("handles missing event description", () => {
    const eventWithoutDescription: IEventDetails = {
      ...event,
      description: "",
    };
    const { queryByText } = render(
      <EventDetails event={eventWithoutDescription} />
    );
    expect(
      queryByText("This is a sample event description")
    ).not.toBeInTheDocument();
  });
});
