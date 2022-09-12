import React from 'react'
import { Line, ResponsiveLine } from '@nivo/line';
import { useTheme } from "@mui/material";


const commonProperties = {
    width: 500,
    height: 100,
    margin: { top: 4, right: 20, bottom: 25, left: 27 },
    animate: true,
    useMesh : true,
    enableSlices : 'x',
    enableSlices :'y'  
  };

export  function HeartBeatTracker() {
  return (
    <Line
    {...commonProperties}
    data={[
      {
        id: "fake corp. A",
        data: [
          { x: "2018-01-01", y: 100 },
          { x: "2018-01-02", y: 120 },
          { x: "2018-01-03", y: 100 },
          { x: "2018-01-04", y: 120 },
          { x: "2018-01-05", y: 120 },
          { x: "2018-01-06", y: 100 },
          { x: "2018-01-07", y: 120 },
          { x: "2018-01-08", y: 100 },
        ],
      },
       
    ]}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      useUTC: false,
      precision: "day",
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min : "auto",
      max : "auto",
      reverse: false,
      stacked : true
         }}
    axisLeft={{
      legendOffset: 14,
      tickValues: 2,


    }}
    enablePointLabel = {false}
    pointColor="white"
    axisBottom={{
      format: "%b %d",
      tickValues: "every 1 days",
      legendOffset: -12,
      legendPosition: "middle",

    }}
    enableGridX={false}
    curve={"monotoneX"}
    pointSize={8}
    pointBorderWidth={1}
    pointBorderColor={{
      from: "color",
      modifiers: [["darker", 0.4]],
    }}
    colors = "white"
    useMesh={true}
    enableSlices={false}
    theme={{
        axis: {
          ticks: {
            line: {
              stroke: "white"
            },
            text: {
              fill: "white"
            }
          }
        },
        grid: {
          line: {
            stroke: "white",
            strokeWidth: 0.4,
            strokeDasharray: "4 4"
          }
        }
      }}
  />
    )
}


export  function TemperatureTracker() {
  const theme = useTheme();

  return (
    <Line
    {...commonProperties}
    data={[
      {
        id: "fake corp. A",
        data: [
          { x: "2018-01-01", y: 100 },
          { x: "2018-01-02", y: 120 },
          { x: "2018-01-03", y: 100 },
          { x: "2018-01-04", y: 120 },
          { x: "2018-01-05", y: 120 },
          { x: "2018-01-06", y: 100 },
          { x: "2018-01-07", y: 120 },
          { x: "2018-01-08", y: 100 },
        ],
      },
       
    ]}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      useUTC: false,
      precision: "day",
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min : "auto",
      max : "auto",
      stacked: false,
      reverse: false,
         }}
    axisLeft={{
      legendOffset: 14,
      tickValues: 2,

    }}
    pointColor="white"

    enablePointLabel = {false}
    axisBottom={{
      format: "%b %d",
      tickValues: "every 1 days",
      legendOffset: -12,
      legendPosition: "middle",

    }}
    enableGridX={false}
    curve={"monotoneX"}
    pointSize={8}
    pointBorderWidth={1}
    pointBorderColor={theme.palette.v2.secondary}
    colors = {theme.palette.v2.secondary}
    useMesh={true}
    enableSlices={false}
    theme={{
        axis: {
          ticks: {
            line: {
              stroke: theme.palette.v2.secondary
            },
            text: {
              fill: theme.palette.v2.secondary
            }
          }
        },
        grid: {
          line: {
            stroke: theme.palette.v2.secondary,
            strokeWidth: 0.4,
            strokeDasharray: "4 4"
          }
        }
      }}
  />
    )
}


export  function BloodPressureTracker() {
  const theme = useTheme();

  return (
    <Line
    {...commonProperties}
    data={[
      {
        id: "fake corp. A",
        data: [
          { x: "2018-01-01", y: 100 },
          { x: "2018-01-02", y: 120 },
          { x: "2018-01-03", y: 100 },
          { x: "2018-01-04", y: 120 },
          { x: "2018-01-05", y: 120 },
          { x: "2018-01-06", y: 100 },
          { x: "2018-01-07", y: 120 },
          { x: "2018-01-08", y: 100 },
        ],
      },
      {
        id: "fake corp. B",
        data: [
          { x: "2018-01-01", y: 120 },
          { x: "2018-01-02", y: 110 },
          { x: "2018-01-03", y: 120 },
          { x: "2018-01-04", y: 140 },
          { x: "2018-01-05", y: 150 },
          { x: "2018-01-06", y: 150 },
          { x: "2018-01-07", y: 140 },
          { x: "2018-01-08", y: 100 },
        ],
      },
       
    ]}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      useUTC: false,
      precision: "day",
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min : "auto",
      max : "auto",
      stacked: true,
      reverse: false,
         }}
    axisLeft={{
      legendOffset: 14,
      tickValues: 2,

    }}
    pointColor="white"

    enablePointLabel = {false}
    axisBottom={{
      format: "%b %d",
      tickValues: "every 1 days",
      legendOffset: -12,
      legendPosition: "middle",

    }}
    enableGridX={false}
    curve={"monotoneX"}
    pointSize={8}
    pointBorderWidth={1}
    pointBorderColor={theme.palette.v2.secondary}
    colors = {theme.palette.v2.secondary}
    useMesh={true}
    enableSlices={false}
    theme={{
        axis: {
          ticks: {
            line: {
              stroke: theme.palette.v2.secondary
            },
            text: {
              fill: theme.palette.v2.secondary
            }
          }
        },
        grid: {
          line: {
            stroke: theme.palette.v2.secondary,
            strokeWidth: 0.4,
            strokeDasharray: "4 4"
          }
        }
      }}
  />
    )
}

