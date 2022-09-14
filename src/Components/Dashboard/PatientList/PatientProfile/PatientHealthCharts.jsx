import React from 'react'
import { Line, ResponsiveLine } from '@nivo/line';
import { useTheme } from "@mui/material";


const commonProperties = {
    width: 430,
    height: 150,
    margin: { top: 30, right: 20, bottom: 35, left: 30 },
    animate: true,
    useMesh : true,
    enableSlices : 'x',
    enableSlices :'y',
    xScale :  {
      type: "time",
      format: "%Y-%m-%dT%H:%M:%S.%L%Z",
      useUTC: false,
      precision: "hour",
    },
    xFormat: "time:%b-%d,%H:%M",
    yScale: {
      type: "linear",
      min : "auto",
      max : "auto",
      reverse: false,
      stacked : true
         },
    axisLeft: {
      legendOffset: 14,
      tickValues: 2,
    },
    axisBottom : {
      format: "%H:%M %b %d",
          tickValues: "every 6 hours",
      legendOffset: -12,
      legendPosition: "middle",
    },
    curve :"monotoneX",
    pointSize : 8,
    pointBorderWidth : 1,
    pointBorderColor :{
      from: "color",
      modifiers: [["darker", 0.4]],
    },
  };


export  function O2LevelTracker({data}) {
  return (
    <Line
    {...commonProperties}
    data={[
      {
        id: "O2 level",
        data: data
      },
       
    ]}
  
    // enablePointLabel = {false}
    pointColor="white"
    // enableGridX={false}
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


export  function TemperatureTracker({data}) {
  const theme = useTheme();

  return (
    <Line
    {...commonProperties}
    data={[
      {
        id: "Temperature",
        data: data
      },
       
    ]}
   
    pointColor="white"

    enablePointLabel = {false}
    
    enableGridX={false}
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


export  function BloodPressureTracker({data}) {
  const theme = useTheme();

  return (
    <Line
    {...commonProperties}
    data={data}
   
    pointColor="white"

    enablePointLabel = {false}
 
    enableGridX={false}
    curve={"monotoneX"}
    pointSize={8}
    pointBorderWidth={1}
    pointBorderColor={theme.palette.v2.secondary}
    colors = {{scheme : "nivo"}}
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

      legends={[
        {
            anchor: 'top-center',
            direction: 'row',
            justify: false,
            translateX: 80,
            translateY: -30,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
  />
    )
}

