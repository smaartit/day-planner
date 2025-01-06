import { Typography } from "@mui/material";
import { IEventDetails } from "./EventSchedular";

interface IProps {
  event: IEventDetails;
}

const EventDetails = ({ event }: IProps) => {
  return (
    <>
      <Typography>{event.description}</Typography>
    </>
  );
};

export default EventDetails;
