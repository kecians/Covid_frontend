// import dependencies


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import Publicpage from './Pages/Publicpage/Publicpage'
import Home from './Pages/Home/Home'
import Plist from './Pages/Plist/Plist'
import Searchbar  from './Pages/Info/Info'
import Admitpatient from './Pages/Admitpatient/Admitpatient'
import Patientprofile from './Pages/Patientprofile/Patientprofile'
import Healthform from './Pages/Healthform/Healthform'
// import Signup from './Pages/Signup/Signup'
import Loader from './Components/Loader/Loader'
import Toastify from './Components/Toastify/Toastify'
import { ToastProvider } from 'react-toast-notifications';
import LockRoute from './LockRoute'
import PrivateRoute from './PrivateRoute'
import Bedchange from './Pages/Bedchange/Bedchange'
import Statuschange from './Pages/Statuschange/Statuschange'
import Publicpatientprofile from './Pages/Publicpatientprofile/Publicpatientprofile'
import Page404 from './Pages/Page404/Page404'
function App() {
  return (
    <BrowserRouter>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="bottom-center"
        >
          <Loader />
          <Toastify />
        <Switch>
          <LockRoute exact path="/" component={Publicpage} />  
          <LockRoute exact path="/login" component={Home} />  
          {/* <LockRoute exact path="/signup" component={Signup} /> */}
          <PrivateRoute exact path="/list" component={Plist} />
          <PrivateRoute exaact path="/home" component={Searchbar} />
          <PrivateRoute exact path="/patient/admit" component={Admitpatient} />
          <Route exact path="/patient/profile/:id/:contact" component={Patientprofile} />
          <PrivateRoute exact path="/patient/healthcheck/:id/:name" component={Healthform} />
          <PrivateRoute exact path="/patient/bedchange/:id" component={Bedchange} />
          <PrivateRoute exact path="/patient/statuschange/:id" component={Statuschange} />
          <LockRoute exact path="/patient/profile/" component={Publicpatientprofile} />
          <Route path="*" component={Page404}/>
        </Switch>
      </ToastProvider>
      </BrowserRouter>
  );
}

export default App;
