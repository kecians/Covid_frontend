import { ResponsivePie } from '@nivo/pie'
import { Line } from '@nivo/line';
import { useTheme } from '@mui/material';

const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 10, right: 20, bottom: 200, left: 80 },
    animate: true,
    enableSlices: "x",
    useMesh : true,
    enableSlices : 'x',
    enableSlices :'y'
  };

export const LineChart = (props) => {
    const{
        data,
        margin = { top: 50, right: 110, bottom: 50, left: 60 }
    } = props;


    return (
        <Line
        {...commonProperties}
        width={600}
        height={400}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          tickValues: ["FI", "CM"]
        }}
        data={[
          {
            id: "whatever",
            data: [
              {
                x: "FI",
                y: 12
              },
              {
                x: "CM",
                y: 17
              },
              {
                x: "AW",
                y: 19
              },
              {
                x: "NL",
                y: 9
              }
            ]
          }
        ]}
      /> )
   
    }
    

export const PieChart = (props) =>  {

    const theme = useTheme();

    const {
        labelColor,
        colorScheme = 'green_blue',
        data = [],  
        textColor = "white",
        hoverText = "black",

    } = props;

    return(


    <ResponsivePie
        data={data}
        colors={{ scheme: colorScheme }}
        margin={{ top: 0,right : 70,  bottom: 0, left: 0 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels = {false}
        // arcLinkLabelsSkipAngle={10}
        // arcLinkLabelsTextColor= "white"
        // arcLinkLabelsThickness={2}
        // arcLinkLabelsColor={{ from: 'color' }}
        // arcLabelsSkipAngle={10}
        // arcLabelsTextColor={{
        //     from: 'color',
        //     modifiers: [
        //         [
        //             'darker',
        //             2
        //         ]
        //     ]
        // }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'white',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'white',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 3,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 28,
                itemTextColor: textColor,
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: hoverText
                        }
                    }
                ]
            }
        ]}
    />
)}