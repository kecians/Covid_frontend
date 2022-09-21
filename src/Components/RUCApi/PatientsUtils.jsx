import * as React from "react";
import { NativeText, SecondaryText } from "./Text";
import { Box } from "@mui/system";
import { useTheme } from '@mui/styles';

export const PatientConditionIndicator = ({ type }) => {
  const colorOption = {
    critical: "#f30035",
    normal: "#61c554",
    satisfactory: "blue",
    stable: "#61c554",
    Asymptomataic: "orangered",
    Mild: "#61c554",
    Moderate: "#f5bf4f",
    Severe: "#f30035",
    active : "blue"
  };

  const theme = useTheme()

  return (
    <NativeText
      sx = {{
        fontSize : theme.size.text.p2
      }}
    >
     { type !== "NA" ? 
      <>
      <Box
        mx={1}
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: colorOption[type],
          borderRadius: "100%",
          display: "inline-block",
        }}
      ></Box>
      {type}
      </>
      : 
      "" }
    </NativeText>
  );
};
