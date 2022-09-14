import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { NativeHeading, NativeText, PrimaryHeading, PrimaryText, SecondaryHeading, SecondaryText, SMText, XSMText } from "./Text";
import { Box } from "@mui/system";
import { PieChart } from "./Charts/PieChart";
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoMdBed } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import {MdPeople} from "react-icons/md"
import { Line, ResponsiveLine } from "@nivo/line";

export const NativeCard = styled(Card)(( {theme}) => ({

  background: theme.palette.card.default,
  borderRadius: "20px",
  minWidth: "100px",
  height: "auto",
  width: "auto",
  position : "relative",
  padding: "10px 15px",
  boxShadow : "none",
  border : "1px solid" + theme.palette.border.primary,
}));


export const BedOccupancyStatusCard = (props) => {
  const { data = [] } = props;
  const theme = useTheme()
  
  return (

      <HealthCard 
      
        header = {
          <>
          <NativeText sx = {{ fontSize : theme.size.text.p1 }} >Occupancy</NativeText>
          <IoMdBed />
          </>
        }
        loading = { !data.length}
        reading = {
          <NativeHeading sx = {{ fontSize : theme.size.heading.h1,  }} >
            <SMText sx = {{ color : theme.palette.text.light, fontWeight : "200" , margin : "0px", padding : "0px" }} >Total </SMText> 120
          </NativeHeading>
        }
        fill = {true}
        chart = {
          <Box
          sx={{
            width: "240px",
            height: "150px",
          }}
        >
          <PieChart data={data} />
        </Box>

        }
      
      />
  );
};

export const CovidCaseCard = (props) => {


  const {
    data = []
  } = props;

  const theme = useTheme()
  const commonProperties = {

    margin: { top: 14, right: 20, bottom: 25, left: 37 },
    animate: true,
    useMesh : true,
    enableSlices : 'x',
    enableSlices :'y'  
  };
  return (

    <HealthCard 
    sx = {{
      width : "500px"
    }}
      header = {
      <>
      <NativeText sx = {{ fontSize : theme.size.text.p1 }} >Total Covid Patients</NativeText>
      </>
    }
    loading = { !(data && data.length)}
    reading = {
      <NativeHeading sx = {{ fontSize : theme.size.heading.h1,  }} >
            <SMText sx = {{ color : theme.palette.text.light, fontWeight : "200" , margin : "0px", padding : "0px" }} >Total </SMText> 420
      </NativeHeading>
    }
    fill = {true}
    type = "t1"
    chart = {
      <Box
      sx={{
        width: "auto",
        height: "150px",
      }}
    >
    
    <ResponsiveLine
    {...commonProperties}
    data={[
      {
        id: "Covid Cases",
        data: data
      },
       
    ]}
    enableArea = {true}
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
    </Box>

    }
    />
  )
}

export const PatientCategoryStatusCard = (props) => {
  const { data = [] } = props;
  const theme = useTheme()

  return (
    <HealthCard 


    header = {
      <>
      <NativeText sx = {{ fontSize : theme.size.text.p1 }} >Patient Status</NativeText>
      <MdPeople />
      </>
    }
    loading = { !(data && data.length)}
    reading = {
      <NativeHeading sx = {{ fontSize : theme.size.heading.h1,  }} >
            <SMText sx = {{ color : theme.palette.text.light, fontWeight : "200" , margin : "0px", padding : "0px" }} >Total </SMText> 420
      </NativeHeading>
    }
    fill = {true}
    type = "t3"
    chart = {
      <Box
      sx={{
        width: "240px",
        height: "150px",
      }}
    >
    
      <PieChart data={data}  colorScheme = "purples" />
    </Box>

    }
  
  />
  );
};

export const PatientStatusCard = (props) => {
  return (
    <NativeCard>
      <Box>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PrimaryText>
            <IoMdBed /> 1 Ayush Bisht
          </PrimaryText>
          <IoMdNotifications />
        </Box>
      </Box>
      <Box></Box>
      <SecondaryText>
        <BsCalendarPlusFill />
        Medicine Treatment at
        <SMText>8:00</SMText>
      </SecondaryText>
    </NativeCard>
  );
};


export const HealthCard = (props) => {
  const theme = useTheme()
  const{
    header,
    reading,
    chart   ,
    fill = false,
    type = "primary",
    sx= {},
    loading = false
  } = props;

  return (

    <NativeCard 
      sx = {{

        backgroundColor :  fill ? theme.palette.card[type] : theme.palette.card.default,
        width : "auto",
        height : "auto",
        borderRadius : "20px",
        ...sx

      }}
    
    >
      {loading ? 
        <Stack>
        <Skeleton width="100%" height = "20px" />
        <Skeleton width="60%" height = "40px" />
        <Skeleton width="100%" height = "80px" />

        </Stack>
        :      
      <Stack direction = {"column"} spacing = {2} >
        <Box 
           sx = {{
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
            height : "auto",
            minHeight : "20px",

            color : fill ? theme.palette.text.light : theme.palette.text.dark,
            '& svg' : {
              fontSize : "2.9rem",
              color : fill ? theme.palette.text.light : theme.palette.v2.secondary,

            }

          }}
        >
        {header}
        </Box>
        <Box
          sx = {{
            padding : "10px 5px"
          }}
        >
          <Box 
            sx = {{
              color : fill ? theme.palette.text.light : theme.palette.text.dark  
            }}
          >
            {reading}
          </Box>
        </Box>
        <Box 
          sx = {{
          overflowX :"auto",
          }}
        >
          {chart}
        </Box>
      </Stack>
    }

    </NativeCard>
  )
}


export const   PatientInfoCard = (props) => {
  const theme = useTheme()

  const{
    heading,
    info = false,
    fill = false,
    sx = {},
    other,
    type = "primary"
  } = props;

  return (
    <NativeCard 
    sx = {{
      background :  fill ? theme.palette.card[type] : theme.palette.card.default,
      width : "auto",
      height : "auto",
      borderRadius : "20px",
      ...sx
    }}
      >
    { (info  && info.length ) ? 

        <Stack>
          <Box
            sx = {{
              display : "flex",
              alignItems : "center",
              justifyContent : "flex-start",
              '& svg' : {
                color : fill ? theme.palette.v2.primary : theme.palette.v2.secondary,
                fontSize : "2.5rem"
              }
            }}
          >
          {heading}

          </Box>
            <Stack my = {1} direction = "column" spacing = {1}

            >
              {
                info.length && info.map(( val, ind) => (
                  <Box
                    sx = {{
                      textAlign : "left"
                    }}
                    key = {ind}
                  >
                    <NativeText
                      sx = {{
                        fontSize : theme.size.text.p2,
                        color : theme.palette.text.primary,
                        fontWeight : "600",
                      }}
                    >
                    {val.label}
                    </NativeText>
                    <NativeText
                      sx = {{
                        fontSize : theme.size.text.p3,
                        color : theme.palette.text.ternary,
                        marginTop : "0px !important"

                      }}
                    >
                    {val.value}
                    </NativeText>
                  </Box>
                ))
              }
            </Stack>
            {other}
        </Stack> 
         : 
      <Stack sx={{ pt: 0.5 }} gap = {2} height = "150px"  >
      <Skeleton variant="rectangular" width="90%"  height = {50} />
      <Skeleton width="80%" />
      <Skeleton width="60%" />

      </Stack> 
      }
    </NativeCard> )
}