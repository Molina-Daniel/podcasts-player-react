import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import DateFormat from "../components/DateFormat";

const commonStyles = {
  color: "secondary.main",
};

function PodcastSearch({ podcasts = [] }) {
  const navigate = useNavigate();
  const [noPodcastsFound, setNoPodcastsFound] = useState(false);

  const showSelectedPodcast = (collectionId) => {
    navigate(`podcast/${collectionId}`);
  };

  useEffect(() => {
    podcasts?.resultCount === 0
      ? setNoPodcastsFound(true)
      : setNoPodcastsFound(false);
  }, [podcasts]);

  return (
    <>
      {podcasts?.results?.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="podcasts list">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...commonStyles }}>#</TableCell>
                <TableCell sx={{ ...commonStyles }}>Name</TableCell>
                <TableCell sx={{ ...commonStyles }}># Episodes</TableCell>
                <TableCell sx={{ ...commonStyles }}>Released</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {podcasts?.results?.map((podcast) => (
                <TableRow
                  key={podcast.trackId}
                  onClick={() => showSelectedPodcast(podcast.collectionId)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell component="th" scope="row">
                    <IconButton
                      type="button"
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
                    }}
                  >
                    <img
                      className="h-12 w-12 rounded-lg mr-3"
                      src={podcast.artworkUrl100}
                      alt="podcast thumbnail"
                    />
                    <Grid container>
                      <Grid item xs={12} sx={{ color: "primary.main" }}>
                        {podcast.collectionName}
                      </Grid>
                      <Grid item xs={12} sx={{ ...commonStyles }}>
                        {podcast.artistName}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell sx={{ ...commonStyles }}>
                    {podcast.trackCount}
                  </TableCell>
                  <TableCell sx={{ ...commonStyles, minWidth: "110px" }}>
                    <DateFormat date={podcast.releaseDate} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {noPodcastsFound && (
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: "primary.main", fontWeight: "bold", my: "1rem" }}
        >
          Sorry, no podcast found
        </Typography>
      )}
    </>
  );
}

export default PodcastSearch;
