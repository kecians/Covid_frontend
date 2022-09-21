import React, {useRef} from 'react'
import { Line, ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/styles';
import {ChartTooltip} from '../../../RUCApi/ChartTooltip';
import { useChartScroll } from '../../../Hooks/ChartScrollMore';
import { Box } from '@mui/material';

const commonProperties = {
    margin: { top: 30, right: 55, bottom: 35, left: 30 },
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
    tooltip  : ChartTooltip,


  };


export  function O2LevelTracker({data}) {

  const ref = useRef();
  const visible_data = useChartScroll( {ref, data})

  return (

    <Box
      ref = {ref}
      sx = {{
        width : "240px",
        height : "140px"
      }}
    >

    <ResponsiveLine
    {...commonProperties}
    data={[
      {
        id: "O2 level",
        data: visible_data
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

  </Box>
  )
}


export  function TemperatureTracker({data}) {
  const theme = useTheme();
  const ref = useRef();
  const visible_data = useChartScroll( {ref, data})

  return (
    <Box 
      ref = {ref}
      width = "240px"
        height = "140px"
    >

    <ResponsiveLine
    {...commonProperties}
    data={[
      {
        id: "Temperature",
        data: visible_data
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
</Box>
    )
}


export  function BloodPressureTracker({data}) {
  const theme = useTheme();
  const ref = useRef();
  const visible_sys_data = useChartScroll( {ref, data:  data.systolic})
  const visible_dia_data = useChartScroll( {ref,  data : data.diastolic })
  
  return (
    <Box
    ref = {ref}
      width = "350px"
      height = "140px"
  
    >

    <ResponsiveLine
    {...commonProperties}
    data={[ {
      id : "systolic",
      data : visible_sys_data,
    },
   {
      id : "diastolic",
      data : visible_dia_data
   } ]}
    
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
          symbolBorderColor: theme.palette.text.ternary,
          itemTextColor  : theme.palette.text.ternary,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
  />
      </Box>
    )
}

