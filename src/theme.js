import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.03);",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.40)",
    },
    background: {
      paper:
        "linear-gradient(0deg, rgba(10, 10, 10, 0.20) 0%, rgba(10, 10, 10, 0.20) 100%), linear-gradient(132deg, #1B1B1B 0%, #14151F 88.91%)",
      // default: "rgba(255, 255, 255, 0.40)",
    },
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
  },
});

export default theme;
