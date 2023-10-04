import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const VolumeBar = ({ audioRef }) => {
  const [volume, setVolume] = useState(80);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = mute;
    }
  }, [volume, audioRef, mute]);

  return (
    <>
      <Grid item xs={2}>
        <Button onClick={() => setMute((prev) => !prev)}>
          {mute ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </Grid>
    </>
  );
};

export default VolumeBar;
