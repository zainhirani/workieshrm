import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.

export let getDesignTokens = (mode: PaletteMode) => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
          // palette values for light mode
          primary: {
            main: "#666CFF",
            dark: "#046963",
            light: "#08817833",
          },
          secondary: {
            main: "#6c757d",
            light: "#adb5bd",
            dark: "#e9ecee",
          },
          text: {
            primary: "#626477",
            secondary: "#868796",
          },
          background: {
            default: "#F7F7F9",
            paper: "#fff",
          },
          error: {
            main: "#f46a6a",
            light: "#f46a6a2e",
          },
          success: {
            main: "#34c38f",
            light: "#34c38f2e",
          },
          warning: {
            main: "#f1b44c",
            light: "#f1b44c2e",
          },
        }
        : {
          // palette values for dark mode
          primary: {
            main: "#666CFF",
            dark: "#046963",
            light: "#08817833",
          },
          secondary: {
            main: "#383e50",
            light: "#adb5bdb3",
            dark: "#383e50",
          },
          text: {
            primary: "#D1D1E7",
            secondary: "#f8f9fa",
          },
          background: {
            default: "#30334E",
            paper: "#3B3D57",
          },
          error: {
            main: "#f46a6a",
            light: "#f46a6a2e",
          },
          success: {
            main: "#34c38f",
            light: "#34c38f2e",
          },
          warning: {
            main: "#f1b44c",
            light: "#f1b44c2e",
          },
          orange: {
            main: "#FD8E1C",
            light: "#FFE8D0",
          },
          blue: {
            light: "#CFF4E8",
            main: "#0DCAF0",
          },
        }),
    },
    additionalColors: {
      ...(mode === "light"
        ? {
          lightGrey: "#6D7885",
          darkGrey: "#292f46",
          greyWhite: "#495057",
          white: "#141432",
          grey: "#f4f5f9",
          searchIcon: "#adb5bd",
          searchIconTxt: "#fff",
          searchIconHov: "#088178",
        }
        : {
          lightGrey: "#6D7885",
          darkGrey: "#32394e",
          greyWhite: "#ccc",
          white: "#fff",
          grey: "#383e50",
          searchIcon: "#fff",
          searchIconTxt: "#fff",
          searchIconHov: "#383e50",
        }),
    },
    borderRadius: {
      radius1: "4px",
      radius2: "10px",
      // radius3: "32px",
    },
    height: {
      barHeight: "72px",
      tabHeight: "72px",
    },
    shape: {
      borderRadius: 10,
    },
    shadow: {
      boxShadow: "0px 2px 10px 0px rgba(76, 78, 100, 0.22)",
    },
  });

  theme = createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            minHeight: "100vh",
            minWidth: "100%",
          },
          body: {
            position: "absolute",
            minHeight: "100vh",
            minWidth: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "#__next": {
              minHeight: "100%",
            },
            main: {
              // minHeight: "100vh",
              // marginBottom: "50px",
            },
            scrollbarColor: theme.palette.background,
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: theme.palette.background,
              width: "7px",
              height: "7px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: theme.palette.primary.main,
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: theme.palette.primary.main,
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: theme.palette.primary.main,
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            "& label": {
              color: theme.palette.text.primary,
            },
            "& label.Mui-focused": {
              color: theme.palette.primary.dark,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: theme.additionalColors?.lightGrey,
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.dark,
                borderWidth: "0.12rem",
              },

              "&.Mui-error fieldset": {
                borderColor: theme.palette.error.main,
              },
            },
          },
        },
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
            marginBottom: "0px !important",
            "& label": {
              color: theme.palette.text.primary,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          width: "120px",
          contained: {
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
      },
      // MuiFormLabel: {
      //   styleOverrides: {
      //     fontSize: "18px"
      //   },
      // },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: "0",
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            "& .MuiDataGrid-columnHeaders ": {
              borderRadius: "0",
              backgroundColor: theme.palette.background.default,
            },
            "& .MuiDataGrid-footerContainer": {
              border: "0",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            boxShadow: "none",
            border: "1px solid rgba(0,0,0,0.05)",
          },
        },
      },
    },
    typography: {
      h1: {
        fontSize: "40px",
        color: theme.palette.primary.main,
        fontWeight: 400,
        [theme.breakpoints.down("md")]: {
          fontSize: "32px",
        },
      },
    },
  });
  return theme;
};
