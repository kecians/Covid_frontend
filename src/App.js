// import dependencies


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages

import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />  
        </Switch>
      </BrowserRouter>
  );
}

export default App;
