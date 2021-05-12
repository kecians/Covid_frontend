//  import dependencies

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import cookie from 'react-cookies'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
    if (cookie.load("token")) {
        return <Redirect to="/home" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);


export default PrivateRoute;
