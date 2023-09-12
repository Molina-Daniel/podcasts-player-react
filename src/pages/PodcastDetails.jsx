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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateFormat from "../components/DateFormat";
import DurationFormat from "../components/DurationFormat";

const commonStyles = {
  color: "secondary.main",
};

function PodcastDetails({ getPodcastDetails }) {
  const { collectionId } = useParams();
  const [podcastData, setPodcastData] = useState();

  useEffect(() => {
    console.log(`/podcast/${collectionId}`);
    const fetchPodcastData = async () => {
      getPodcastDetails(collectionId).then((data) =>
        setPodcastData(data.results)
      );
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
        <div>
          <img
            src={podcastInfo.artworkUrl600}
            className="w-2/6 mx-auto rounded-2xl h-auto"
            alt="podcast thumnail image"
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ color: "primary.main", fontWeight: "bold", my: "1rem" }}
          >
            {podcastInfo.collectionName}
          </Typography>
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
                {episodesList.map((episode) => (
                  <TableRow
                    key={episode.trackId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
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
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
}

export default PodcastDetails;
