declare module "@mui/material/styles" {
  interface Theme {
    additionalColors?: {
      lightGrey: string;
      darkGrey: string;
      greyWhite: string;
      white: string;
      grey:string;
      searchIcon: string;
      searchIconTxt:string;
      searchIconHov:string;
    };
    borderRadius: {
      radius1: string;
      radius2: string;
      radius3: string;
    };
    height: {
      barHeight: string;
      tabHeight: string;
    };
    shadow: {
      boxShadow: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    additionalColors?: {
      lightGrey: string;
      darkGrey: string;
      greyWhite: string;
      white: string;
      grey:string;
      searchIcon: string;
      searchIconTxt:string;
      searchIconHov:string;
    };
    borderRadius?: {
      radius1?: string;
      radius2?: string;
      radius3?: string;
    };
    height?: {
      barHeight: string;
      tabHeight: string;
    };
    shadow?: {
      boxShadow?: string;
    };
  }
}

export {};
