import {useEffect, useState} from 'react'
import { createTheme } from '@mui/system';
import { useContext, createContext  } from 'react';


 export const dark = {
  palette: {
    mode: 'dark' ,
    v2 : {
      primary : "rgb(17, 24, 39)",
      secondary : "#5156BE",
      offlight : "rgb(17, 24, 39)",
      light : "rgb(11, 15, 25)",
      dark : "#424242"
    },
    text : {
      primary : "#5156BE",
      secondary : "#fff",
      ternary : "#fff",
      light : "#fff",
      dark : "#424242"
    },
    button : {
      primary : "#6C70F9",
      secondary : "#6C70F9"
    },
    border : {
        primary : "rgb(45, 55, 72)",
        secondary : "black"

      },
      card : {
        primary : "#5156BE",
        default : "rgb(17, 24, 39)",
        secondary : "",
        dark : "",
        t1 : "#4FE1B8",
        t2 : "#8160FF",
        t3 : "#558CFF"
      }
  },
  size : {
    text : {
      p1 : "1.8rem",
      p2 : "1.4rem",
      p3 : "1.2rem"
    },
    heading : {
      h1 : "3rem",
      h2 : "2.5rem",
      h3 : "2rem",
      h4 : "1.4rem",

    },
    input : {
      h : "20px",
      w : "250px",
      fs : "1.6rem",
      lfs : "1.4rem"
    }

  }
  };

  export const light =     {
    palette: {
      mode: 'light' ,
      v2 : {
        primary : "#FAFAFE",
        secondary : "#5156BE",
        offlight : "#A2A1AD",
        light : "#fff",
        dark : "#424242"
      },
      text : {
        primary : "#5156BE",
        secondary : "#424242",
        ternary : "#A2A1AD",
        light : "#fff",
        dark : "#424242"
      },
      button : {
        primary : "#6C70F9",
        secondary : "#6C70F9"
      },
      border : {
          primary : "#E7E8FC",
          secondary : "black"
  
        },
        card : {
          primary : "#5156BE",
          default : "rgb(255,254,254, 0.4)",
          secondary : "",
          dark : "",
          t1 : "#4FE1B8",
          t2 : "#8160FF",
          t3 : "#558CFF"
        }
    },
    size : {
      text : {
        p1 : "1.8rem",
        p2 : "1.4rem",
        p3 : "1.2rem"
      },
      heading : {
        h1 : "3rem",
        h2 : "2.5rem",
        h3 : "2rem",
        h4 : "1.4rem",
  
      },
      input : {
        h : "20px",
        w : "250px",
        fs : "1.6rem",
        lfs : "1.4rem"
      }
  
    }
  };


  export const ThemeContext = createContext({
    mode : "dark",
    toggleTheme : () =>{},

  })
