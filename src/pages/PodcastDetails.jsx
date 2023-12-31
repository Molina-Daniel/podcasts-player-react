import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import DateFormat from "../components/DateFormat";
import DurationFormat from "../components/DurationFormat";
import BlueCheck from "../assets/BlueCheck";
import { useStore } from "../store/store";

const commonStyles = {
  color: "secondary.main",
};

function PodcastDetails() {
  const { collectionId } = useParams();
  const [podcastData, setPodcastData] = useState();

  const {
    isPlayingCurrentPodcast,
    isNewPodcast,
    getPodcastEpisodes,
    playPodcastIndex,
    togglePlayPause,
    checkPodcastPlayButton,
    episodesFetchError,
  } = useStore();

  useEffect(() => {
    const fetchPodcastData = async () => {
      await getPodcastEpisodes(collectionId).then((data) =>
        setPodcastData(data.results)
      );
    };

    fetchPodcastData();
  }, [collectionId, getPodcastEpisodes]);

  useEffect(() => {
    checkPodcastPlayButton();
  }, [isNewPodcast, checkPodcastPlayButton]);

  const handlePlayPodcast = () => {
    !isNewPodcast ? togglePlayPause() : playPodcastIndex(0);
  };

  let podcastInfo, episodesList;

  if (podcastData) {
    podcastInfo = podcastData[0];
    episodesList = podcastData.slice(1, podcastData.length);
  }

  return (
    <>
      {podcastData && (
        <div>
          <img
            src={podcastInfo.artworkUrl600}
            className="w-2/6 mx-auto rounded-2xl h-auto"
            alt="podcast thumnail image"
          />
          <div className="inline-flex items-center">
            <Button
              onClick={handlePlayPodcast}
              sx={{
                bgcolor: "#5C67DE",
                borderRadius: "50%",
                height: 40,
                minWidth: 40,
                p: 0,
                mr: "1rem",
              }}
            >
              {isPlayingCurrentPodcast ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                my: "1rem",
                mr: "1rem",
                maxWidth: "85%",
              }}
            >
              {podcastInfo.collectionName}
            </Typography>
            <BlueCheck />
          </div>
          <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
            <Table aria-label="podcasts list">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...commonStyles }}>#</TableCell>
                  <TableCell sx={{ ...commonStyles }}>Title</TableCell>
                  <TableCell sx={{ ...commonStyles }}>Topic</TableCell>
                  <TableCell sx={{ ...commonStyles }}>Released</TableCell>
                  <TableCell align="center" sx={{ ...commonStyles }}>
                    <AccessTimeIcon />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {episodesList.map((episode, index) => (
                  <TableRow
                    key={episode.trackId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <IconButton
                        type="button"
                        onClick={() => playPodcastIndex(index)}
                        sx={{
                          p: "10px",
                          color: "primary.main",
                        }}
                        aria-label="play podcast"
                      >
                        <PlayArrowIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "fit-content",
                      }}
                    >
                      <img
                        className="h-12 w-auto rounded-lg mr-3"
                        src={episode.artworkUrl160}
                        alt="episode thumbnail"
                      />
                      <Grid container>
                        <Grid item xs={12} sx={{ color: "primary.main" }}>
                          {episode.trackName}
                        </Grid>
                        <Grid item xs={12} sx={{ ...commonStyles }}>
                          {podcastInfo.artistName}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ ...commonStyles }}>
                      {episode.shortDescription || "-"}
                    </TableCell>
                    <TableCell sx={{ ...commonStyles, minWidth: "110px" }}>
                      <DateFormat date={episode.releaseDate} />
                    </TableCell>
                    <TableCell sx={{ ...commonStyles }}>
                      <DurationFormat duration={episode.trackTimeMillis} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {episodesFetchError && (
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: "primary.main", fontWeight: "bold", my: "1rem" }}
        >
          Sorry, no episodes found 🙁
        </Typography>
      )}
    </>
  );
}

export default PodcastDetails;
