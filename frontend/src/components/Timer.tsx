import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Box, Typography } from "@mui/material";
import { colors } from "../constants/colors";

dayjs.extend(duration);

interface Props {
  deadline: string | Date;
  label?: string;
}

const Timer: React.FC<Props> = ({ deadline, label }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const deadlineTime = useMemo(() => dayjs(deadline), [deadline]);

  const getRemainingTime = () => {
    const currentTime = dayjs();
    const remaining = deadlineTime.diff(currentTime, "milliseconds");

    return remaining > 0 ? remaining : 0;
  };

  const formatTime = () => {
    const formattedTime = dayjs.duration(remainingTime, "milliseconds");
    const seconds = formattedTime.seconds();
    const minutes = formattedTime.minutes();

    if (minutes === 0 && seconds === 0) {
      return null;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(
      () => setRemainingTime(getRemainingTime()),
      1000
    );

    return () => clearInterval(interval);
  }, [getRemainingTime]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 1,
        paddingBottom: 1,
        backgroundColor: colors.pink,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant="body1" component="h1" color={colors.white}>
        {label} {formatTime()}
      </Typography>
    </Box>
  );
};

export default Timer;