import { Grid } from "@mui/material";

const TrackInfo = ({ currentTrack }) => {
  return (
    <>
      <Grid item xs={4} sx={{ display: "flex" }}>
        <img
          className="h-15 w-15 mr-3"
          src={currentTrack.artworkUrl160}
          alt="podcast thumbnail"
        />
        <Grid item xs={6} sx={{ alignSelf: "center" }}>
          <Grid container>
            <Grid item xs={12} sx={{ color: "primary.main" }}>
              {currentTrack.trackName}
            </Grid>
            <Grid item xs={12} sx={{ color: "secondary.main" }}>
              {currentTrack.artistName}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TrackInfo;
