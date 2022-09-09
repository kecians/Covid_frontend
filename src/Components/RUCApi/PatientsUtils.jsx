import * as React from "react";
import { SecondaryText } from "./Text";
import { Box } from "@mui/system";

export const PatientConditionIndicator = ({ type }) => {
  const colorOption = {
    critical: "#f30035",
    normal: "#61c554",
    satisfactory: "#f5bf4f",
    stable: "#61c554",
    Asymptomataic: "#f30035",
    Mild: "#61c554",
    Moderate: "#f5bf4f",
    severe: "#f30035",
  };

  return (
    <SecondaryText>
      <Box
        mx={1}
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: colorOption[type],
          borderRadius: "100%",
          display: "inline-block",
        }}
      ></Box>
      {type}
    </SecondaryText>
  );
};
