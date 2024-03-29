import React from 'react'
import { ResponsiveLine } from '@nivo/line';
import { Line } from '@nivo/line';

const commonProperties = {
  width: 1000,
  height: 700,
  margin: { top: 10, right: 20, bottom: 200, left: 80 },
  animate: true,
  useMesh : true,
  enableSlices : 'x',
  enableSlices :'y'  
};

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
      {" "}
      <circle
        fill="#fff"
        r={size / 2}
        strokeWidth={borderWidth}
        stroke={borderColor}
      />
   
      <circle
        r={size / 5}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );

const TemperatureChart = () => {
    return (
      <Line
        data={[
          {
            id: "fake corp. A",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
              { x: "2018-01-08", y: 13 },
            ],
          },
          {
            id: "fake corp. B",
            data: [
              { x: "2018-01-04", y: 14 },
              { x: "2018-01-05", y: 14 },
              { x: "2018-01-06", y: 15 },
              { x: "2018-01-07", y: 11 },
              { x: "2018-01-08", y: 10 },
              { x: "2018-01-09", y: 12 },
              { x: "2018-01-10", y: 9 },
              { x: "2018-01-11", y: 7 },
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
        }}
        axisLeft={{
          legend: "linear",
          legendOffset: 12,
        }}
        axisBottom={{
          format: "%b %d",
          tickValues: "every 1 days",
          legend: "time",
          legendOffset: -12,
          legendPosition: "middle"
        }}
        curve={"monotoneX"}
        enablePointLabel={true}
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
        
      />
    );
  };

  export default TemperatureChart;