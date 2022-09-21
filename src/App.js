// import dependencies
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
// import pages
import Home from './Pages/Home/Home'
// import Patientprofile from './Pages/Patientprofile/Patientprofile'
// import Healthform from './Pages/Healthform/Healthform'
// import Signup from './Pages/Signup/Signup'
import Loader from './Components/Loader/Loader'
import Toastify from './Components/Toastify/Toastify'
import { ToastProvider } from 'react-toast-notifications';
import LockRoute from './LockRoute'
import PrivateRoute from './PrivateRoute'
// import Statuschange from './Pages/Statuschange/Statuschange'
// // // import Publicpatientprofile from './Pages/Publicpatientprofile/Publicpatientprofile'
import Page404 from './Pages/Page404/Page404'
import Dashboard from './Pages/StaffDashboard/Info';
import {   ThemeProvider, createTheme, } from '@mui/material/styles';
import { FaCookie } from 'react-icons/fa';
import { light, dark } from './Components/RUCApi/ThemeContext.jsx';
import cookie from 'react-cookies'
import { ThemeContext } from './Components/RUCApi/ThemeContext.jsx';
import { useCallback } from 'react';

import { CssBaseline  } from "@mui/material";
 

function App() {

  const [ mode, setMode] = useState("dark")

  const colorMode = useCallback(( )=> {
      setMode( prev => prev === "light" ? "dark" : "light")
    }
  , [])

 
  const theme = useMemo(() => createTheme(mode==="light" ? light : dark ) , [mode]) 

  const colorContext = {
    mode,
    toggleTheme : colorMode,
  }

  return (
    <BrowserRouter>
          <ThemeContext.Provider value = {colorContext} >
            <ThemeProvider theme = {theme} >
              <CssBaseline/>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="bottom-center"
        >
          <Loader />
          <Toastify />
          <Switch>
            <LockRoute exact path="/" component={Home} />  
            <LockRoute exact path="/login" component={Home} />  
            {/* <LockRoute exact path="/signup" component={Signup} /> */}
            {/* <PrivateRoute exact path="/list" component={Plist} /> */}
            <PrivateRoute exaact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/patient/profile/:id/:contact" component={Patientprofile} /> */}
            {/* <PrivateRoute exact path="/patient/healthcheck/:id/:name" component={Healthform} /> */}
            {/* {/* <PrivateRoute exact path="/patient/statuschange/:id" component={Statuschange} /> */} 
            {/* <LockRoute exact path="/patient/profile/" component={Publicpatientprofile} /> */}
            <Route path="*" component={Page404}/>
          </Switch>
      </ToastProvider>
        </ThemeProvider>
        </ThemeContext.Provider>
      </BrowserRouter>
  );
}

export default App;
