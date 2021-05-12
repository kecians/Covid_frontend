// import dependencies


import { BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages

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
function App() {
  return (
    <BrowserRouter>
        <Switch>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="bottom-center"
          >
          <Loader />
          <Toastify />
          <LockRoute exact path="/" component={Home} />  
          {/* <Route exact path="/signup" component={Signup} /> */}
          <PrivateRoute exact path="/list" component={Plist} />
          <PrivateRoute exaact path="/home" component={Searchbar} />
          <PrivateRoute exact path="/patient/admit" component={Admitpatient} />
          <PrivateRoute exact path="/patient/profile/:id" component={Patientprofile} />
          <PrivateRoute exact path="/patient/healthcheck/:id/:name" component={Healthform} />
          </ToastProvider>  
        </Switch>
      </BrowserRouter>
  );
}

export default App;
