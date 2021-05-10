// import dependencies


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages

import Home from './Pages/Home/Home'
import Plist from './Pages/Plist/Plist'
import Searchbar  from './Pages/Info/Info'
import Admitpatient from './Pages/Admitpatient/Admitpatient'
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />  
          <Route exact path="/list" component={Plist} />
          <Route exaact path="/nurse/home" component={Searchbar} />
          <Route exact path="/nurse/admit" component={Admitpatient} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
