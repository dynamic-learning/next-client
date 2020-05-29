import { createContext } from "react";

const themes = {
  darkTheme: {
    color1: "#1ed760", // green
    color2: "#203038", // dark blue
    color3: "#102028", // darker blue
    color4: "#535a60", // grey
    color5: "#aeaeae", // light grey
    color6: "lightgrey", // lighter grey
  },
};

const ThemeContext = createContext(themes);

export default ThemeContext;
