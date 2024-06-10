import * as React from "react";
import { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { useThemeContext } from "contexts/ThemeContext";

import { getDesignTokens } from "../Configs";
import { createEmotionCache } from "./cache";
import Cookies from "js-cookie";
import axios from "axios";
import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { PUBLIC_API_URL } from "configs";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const ThemeProvider: React.FC<any> = (props) => {
  const { emotionCache = clientSideEmotionCache, children } = props;
  const { theme: selectedTheme } = useThemeContext();
  const [Theme, SetTheme] = useState(getDesignTokens(selectedTheme));
  const theme = React.useMemo(
    () => getDesignTokens(selectedTheme),
    [selectedTheme],
  );
  console.log(Theme, "selectedTheme");
  // useEffect(async () => {
  //   const Token = Cookies.get("token");
  //   if (Token) {
  //     const data = await axios.get(`${PUBLIC_API_URL}/Employee/me`, {
  //       headers: {
  //         Authorization: Cookies.get("token"),
  //       },
  //     });
  //     if (data.data.Theme) {
  //       SetTheme((prevTheme) => ({
  //         ...prevTheme,
  //         primary: {
  //           ...prevTheme.primary,
  //           main: "#348feb",
  //           dark: "#348feb",
  //         },  
  //       }));
  //       console.log(Theme);
  //     }
  //   }
  // }, []);
  return (
    <CacheProvider value={emotionCache}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
