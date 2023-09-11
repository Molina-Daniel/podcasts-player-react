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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const commonStyles = {
  color: "secondary.main",
};

function PodcastSearch({ podcasts = [] }) {
  const navigate = useNavigate();

  const showSelectedPodcast = (collectionId) => {
    console.log("collectionId: ", collectionId);
    navigate(`podcast/${collectionId}`);
  };

  return (
    <>
      {podcasts.length > 0 && (
        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table aria-label="podcasts list">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...commonStyles }}>#</TableCell>
                <TableCell sx={{ ...commonStyles }}>Name</TableCell>
                <TableCell sx={{ ...commonStyles }}>Description</TableCell>
                <TableCell sx={{ ...commonStyles }}>Released</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {podcasts.map((podcast) => (
                <TableRow
                  key={podcast.trackId}
                  onClick={() => showSelectedPodcast(podcast.collectionId)}
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
                  <TableCell sx={{ ...commonStyles }}>
                    {podcast.releaseDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default PodcastSearch;
