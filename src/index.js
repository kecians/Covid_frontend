import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import {   ThemeProvider, createTheme, } from '@mui/material/styles';
import DefaultTheme from './Components/RUCApi/Theme'

const light =     createTheme({
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
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <ThemeProvider theme = {light} >
          <App />
          </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
