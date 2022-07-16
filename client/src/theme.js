import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF3B3F",
    },
    secondary: {
      main: "#F6F4F4",
    },
    otherColor: {
      main: "EFEFEF",
    },
    carbon: {
      main: "A9A9A9",
    },
  },

  typography: {
    fontFamily: ["Hind", "PT Sans", "Quicksand", "Nunito", "sans-serif"].join(
      ","
    ),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },

//   components: {
//     MuiToolbar: {
//         styleOverrides: {
//             dense: {
//                 height: 50,
//                 // minHeight: 32
//             }
//         }
//     }
// },
});

export default theme;
