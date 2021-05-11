// import dependencies


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages

import Home from './Pages/Home/Home'
import Plist from './Pages/Plist/Plist'
import Searchbar  from './Pages/Info/Info'
import Admitpatient from './Pages/Admitpatient/Admitpatient'
import Patientprofile from './Pages/Patientprofile/Patientprofile'
import Healthform from './Pages/Healthform/Healthform'
import Signup from './Pages/Signup/Signup'
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />  
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/list" component={Plist} />
          <Route exaact path="/nurse/home" component={Searchbar} />
          <Route exact path="/nurse/patient/admit" component={Admitpatient} />
          <Route exact path="/nurse/patient/profile" component={Patientprofile} />
          <Route exact path="/nurse/patient/healthcheck" component={Healthform} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
