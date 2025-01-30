import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF00BF", // Lyft Pink
    },
    secondary: {
      main: "#352384", // Lyft Purple
    },
    background: {
      default: "#F3F3F3",
      paper: "#ffffff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
