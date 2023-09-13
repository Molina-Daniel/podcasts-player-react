import React from "react";
import { useEffect, useRef, useCallback } from "react";
import { Grid, ButtonGroup, Button } from "@mui/material";

import PreviousTrack from "./ControlButtons/PreviousTrack.jsx";
import Shuffle from "./ControlButtons/Shuffle.jsx";
import NextTrack from "./ControlButtons/NextTrack.jsx";
import Repeat from "./ControlButtons/Repeat.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const Controls = ({
  audioRef,
  isPlaying,
  handleNext,
  handlePrevious,
  progressBarRef,
  setTimeProgress,
  togglePlayPause,
}) => {
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <>
      <Grid item xs={3}>
        <ButtonGroup variant="text" aria-label="controls button group">
          <Button>
            <Shuffle />
          </Button>
          <Button onClick={handlePrevious}>
            <PreviousTrack />
          </Button>
          <Button
            onClick={togglePlayPause}
            sx={{
              bgcolor: "#5C67DE",
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
          <Button onClick={handleNext}>
            <NextTrack />
          </Button>
          <Button>
            <Repeat />
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default Controls;
