import { Typography } from "@mui/material";
import { ITaskDetails } from "./TaskSchedular";

interface IProps {
  event: ITaskDetails;
}

const TaskDetails = ({ event }: IProps) => {
  return (
    <>
      <Typography style={{ lineHeight: "unset" }}>
        {event.description}
      </Typography>
    </>
  );
};

export default TaskDetails;
