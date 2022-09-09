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
      primary : "#f3f3f3",
      secondary : "#055895",
      ternary : "",
      light : "#fff",
      dark : "#424242"
    },
    text : {
      primary : "#055895",
      secondary : "#424242",
      ternary : "",
      light : "#fff",
      dark : "#424242"
    }
  },
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
