import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const commonStyles = {
  color: "secondary.main",
};

function PodcastDetails() {
  const { collectionId } = useParams();
  const [podcastData, setPodcastData] = useState();

  const getPodcastData = async (collectionId) => {
    const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&media=podcast&entity=podcastEpisode&limit=10`;
    const response = await axios.get(apiUrl);
    console.log("PodcastDetails fetch: ", response);
    return response.data;
  };

  useEffect(() => {
    console.log(`/podcast/${collectionId}`);
    const fetchPodcastData = async () => {
      getPodcastData(collectionId).then((data) => setPodcastData(data.results));
    };
    fetchPodcastData();
  }, [collectionId]);

  let podcastInfo, episodesList;

  if (podcastData) {
    console.log("podcastData: ", podcastData);
    podcastInfo = podcastData[0];
    episodesList = podcastData.slice(1, podcastData.length);
    console.log("podcastInfo: ", podcastInfo);
    console.log("podcastList: ", episodesList);
  }

  return (
    <>
      {podcastData ? (
        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table aria-label="podcasts list">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...commonStyles }}>#</TableCell>
                <TableCell sx={{ ...commonStyles }}>Title</TableCell>
                <TableCell sx={{ ...commonStyles }}>Topic</TableCell>
                <TableCell sx={{ ...commonStyles }}>Released</TableCell>
                <TableCell sx={{ ...commonStyles }}>
                  <AccessTimeIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {episodesList.map((episode) => (
                <TableRow
                  key={episode.trackId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    {episode.trackCount}
                  </TableCell>
                  <TableCell sx={{ ...commonStyles }}>
                    {episode.releaseDate}
                  </TableCell>
                  <TableCell sx={{ ...commonStyles }}>
                    {episode.trackTimeMillis || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
}

export default PodcastDetails;
