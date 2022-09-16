import { Box, Stack } from "@mui/material";
import { SMText } from "./Text.jsx";
import { useTheme } from "@mui/material";
import React from "react";

export const ChartTooltip = (props) => {
  const { point } = props;

  const theme = useTheme();

  console.table(props);

  return (
    <Stack
      width="auto"
      minWidth="20px"
      minHeight="10px"
      height="auto"
      direction="row"
      alignItems="center"
      sx={{
        background: "white",
        zIndex: "1000",
        position: "relative",
        display: "inlineflex",
        padding: "2px 4px ",
        borderRadius: "2px",
        fontSize: "10px",
        border: "1px solid" + point.serieColor,

      }}
    >
      <span
        style={{
          background: point.serieColor,
          display: "block",
          width: "10px",
          height: "10px",
          borderRadius: "2px",
        }}
      ></span>
      <span>
        <i>x</i> : <b>{point.data.xFormatted}</b> ,{" "}
      </span>
      <span>
        <i>y</i> : <b>{point.data.yFormatted}</b>{" "}
      </span>
    </Stack>
  );
};



export const PieTooltip = (props) => {
    const { datum } = props;
  
    const theme = useTheme();
  
    console.table(" pie " , props);
  
    return (
      <Stack
        width="auto"
        minWidth="20px"
        minHeight="10px"
        height="auto"
        direction="row"
        alignItems="center"
        spacing = {0.5}
        sx={{
          background: "white",
          zIndex: "1000",
          position: "relative",
          display: "inlineflex",
          padding: "2px 4px ",
          borderRadius: "2px",
          fontSize: "10px",
          border: "1px solid" + datum.color,
  
        }}
      >
        <span
          style={{
            background: datum.color,
            display: "block",
            width: "10px",
            height: "10px",
            borderRadius: "2px",
          }}
        ></span>
        <span>
          <b>{datum.data.label}</b> :{" "}
        </span>
        <span>
           <b>{datum.formattedValue}</b>{" "}
        </span>
      </Stack>
    );
  };
  
