import { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";

import TrackInfo from "./TrackInfo.jsx";
import Controls from "./Controls.jsx";
import ProgressBar from "./ProgressBar.jsx";
import VolumeBar from "./VolumeBar.jsx";
import { useStore } from "../../store/store.jsx";

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const { episodes, index, isPlaying } = useStore();

  useEffect(() => {
    setCurrentTrack(episodes[trackIndex]);
  }, [episodes, trackIndex]);

  useEffect(() => {
    setTrackIndex(index);
    setCurrentTrack(episodes[trackIndex]);
  }, [index]);

  const onLoadedMetadata = () => {
    const duration = audioRef.current.duration;
    setTrackDuration(duration);
    progressBarRef.current.max = duration;
    if (isPlaying) {
      setAutoPlay(true);
    }
  };

  const handleNext = () => {
    if (trackIndex >= episodes.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(episodes[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(episodes[trackIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = episodes.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(episodes[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(episodes[trackIndex - 1]);
    }
  };

  return (
    <>
      <div className="min-w-full fixed right-0 bottom-0">
        {currentTrack && (
          <Grid
            container
            sx={{
              alignItems: "center",
              bgcolor: "#1A1A1A",
            }}
          >
            <audio
              autoPlay={autoPlay}
              src={currentTrack.episodeUrl}
              ref={audioRef}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={handleNext}
            />
            <TrackInfo currentTrack={currentTrack} />
            <Controls
              {...{
                audioRef,
                handleNext,
                handlePrevious,
                progressBarRef,
                setTimeProgress,
              }}
            />
            <ProgressBar
              {...{ audioRef, trackDuration, progressBarRef, timeProgress }}
            />
            <VolumeBar audioRef={audioRef} />
          </Grid>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
