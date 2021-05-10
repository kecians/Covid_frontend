// import dependencies


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages

import Home from './Pages/Home/Home'
import Plist from './Pages/Plist/Plist'
function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />  
          <Route exact path="/list" component={Plist} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
