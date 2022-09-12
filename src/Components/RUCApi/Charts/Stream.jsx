import React from 'react';
import { ResponsiveStream } from '@nivo/stream'

const StreamChart = (props) => {

    const {
        data = [
            {
              "Raoul": 162,
              "Josiane": 136,
              "Marcel": 159,
              "René": 169,
              "Paul": 52,
              "Jacques": 15
            },
            {
              "Raoul": 34,
              "Josiane": 159,
              "Marcel": 192,
              "René": 85,
              "Paul": 99,
              "Jacques": 85
            },
            {
              "Raoul": 69,
              "Josiane": 186,
              "Marcel": 123,
              "René": 85,
              "Paul": 118,
              "Jacques": 107
            },
            {
              "Raoul": 151,
              "Josiane": 85,
              "Marcel": 186,
              "René": 77,
              "Paul": 94,
              "Jacques": 64
            },
            {
              "Raoul": 143,
              "Josiane": 184,
              "Marcel": 88,
              "René": 11,
              "Paul": 185,
              "Jacques": 162
            },
            {
              "Raoul": 196,
              "Josiane": 199,
              "Marcel": 195,
              "René": 179,
              "Paul": 50,
              "Jacques": 80
            },
            {
              "Raoul": 164,
              "Josiane": 44,
              "Marcel": 186,
              "René": 155,
              "Paul": 13,
              "Jacques": 49
            },
            {
              "Raoul": 126,
              "Josiane": 112,
              "Marcel": 98,
              "René": 90,
              "Paul": 66,
              "Jacques": 94
            },
            {
              "Raoul": 161,
              "Josiane": 70,
              "Marcel": 81,
              "René": 105,
              "Paul": 149,
              "Jacques": 12
            }
          ]
    } = props;

    return (
        <ResponsiveStream
        data={data}
        keys={[
            'Raoul',
            'Josiane',
            'Marcel',
            'René',
            'Paul',
            'Jacques'
        ]}
        margin={{ top: 0, right: 10, bottom: 0, left: 0 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40
        }}
        enableGridX={true}
        enableGridY={false}
        offsetType="silhouette"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#2c998f',
                size: 4,
                padding: 2,
                stagger: true
            },
            {
                id: 'squares',
                type: 'patternSquares',
                background: 'inherit',
                color: '#e4c912',
                size: 6,
                padding: 2,
                stagger: true
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Paul'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Marcel'
                },
                id: 'squares'
            }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.7
                ]
            ]
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000'
                        }
                    }
                ]
            }
        ]}
    />
    );
}

export default StreamChart;
