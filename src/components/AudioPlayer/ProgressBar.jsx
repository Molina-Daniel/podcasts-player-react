import React from "react";
import { Grid } from "@mui/material";

const ProgressBar = ({
  audioRef,
  progressBarRef,
  timeProgress,
  trackDuration,
}) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const timeFormat = (time) => {
    if (time && !isNaN(time)) {
      const hours = Math.floor(time / 3600);
      const formatHours = hours === 0 ? `` : `0${hours}:`;
      time %= 3600;
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatHours}${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <>
      <Grid item xs={3}>
        <Grid container>
          <Grid item xs={2} sx={{ color: "primary.main" }}>
            {timeFormat(timeProgress)}
          </Grid>
          <Grid item xs={8}>
            <input
              type="range"
              defaultValue="0"
              ref={progressBarRef}
              onChange={handleProgressChange}
              style={{ width: "-webkit-fill-available" }}
            />
          </Grid>
          <Grid item xs={2} sx={{ color: "secondary.main" }}>
            {timeFormat(trackDuration)}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProgressBar;
