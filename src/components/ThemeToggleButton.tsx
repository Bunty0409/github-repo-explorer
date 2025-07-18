import React from "react";
import { Switch, FormControlLabel, useTheme } from "@mui/material";
import { useColorMode } from "../theme/ThemeContext";

const ThemeToggleButton: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const isDark = theme.palette.mode === "dark";

  return (
    <FormControlLabel
      control={<Switch checked={isDark} onChange={toggleColorMode} />}
      label={isDark ? "Dark Mode" : "Light Mode"}
      labelPlacement="start"
    />
  );
};

export default ThemeToggleButton;
