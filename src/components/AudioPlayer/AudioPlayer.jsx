import { useState, useEffect } from "react";
import { Grid, ButtonGroup, Button } from "@mui/material";

import { tracks } from "../../assets/tracks.js";
import PreviousTrack from "./ControlButtons/PreviousTrack.jsx";
import Shuffle from "./ControlButtons/Shuffle.jsx";
import Play from "./ControlButtons/Play.jsx";
import Pause from "./ControlButtons/Pause.jsx";
import NextTrack from "./ControlButtons/NextTrack.jsx";

const commonStyles = {
  color: "secondary.main",
};

const AudioPlayer = ({ episodes }) => {
  const [podcastTracks, setpodcastTracks] = useState();

  useEffect(() => {
    setpodcastTracks(tracks);
  }, []);

  return (
    <>
      <div className="min-w-full fixed right-0 bottom-0">
        {podcastTracks && (
          <Grid
            container
            sx={{
              pr: "4rem",
              alignItems: "center",
              bgcolor: "#1A1A1A",
            }}
          >
            {/* Track Info */}
            <Grid item xs={4} sx={{ display: "flex" }}>
              <img
                className="h-15 w-15 mr-3"
                src={podcastTracks[0].artworkUrl160}
                alt="podcast thumbnail"
              />
              <Grid item xs={6} sx={{ alignSelf: "center" }}>
                <Grid container>
                  <Grid item xs={12} sx={{ color: "primary.main" }}>
                    {podcastTracks[0].collectionName}
                  </Grid>
                  <Grid item xs={12} sx={{ ...commonStyles }}>
                    {podcastTracks[0].artistName}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Control Buttons */}
            <Grid item xs={5}>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button>
                  <Shuffle />
                </Button>
                <Button>
                  <PreviousTrack />
                </Button>
                <Button
                  sx={{
                    bgcolor: "#5C67DE",
                  }}
                >
                  <Play />
                </Button>
                <Button>
                  <NextTrack />
                </Button>
              </ButtonGroup>
            </Grid>

            {/* Progress Bar */}
            <Grid item xs={2}>
              <div className="progress">
                <span className="time current">00:00</span>
                <input type="range" defaultValue="0" />
                <span className="time">00:00</span>
              </div>
            </Grid>

            {/* Volume Bar */}
            <Grid item xs={1}>
              <div className="volume">
                <button>Volume</button>
                <input type="range" min={0} max={100} />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
      {/* <h1 className="min-w-full fixed right-0 bottom-0">Podcast Player</h1> */}
    </>
  );
};

export default AudioPlayer;
