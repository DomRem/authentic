import {Redirect, Route, Switch, useLocation, withRouter} from "react-router-dom";
import {Authenticator, NotFound, Dashboard} from "../../../pages";
import React from "react";
import {STORE} from "../../../store";
import {StyledAppInner} from "./AppInner.styles";

const AppInner = () => {
  const isAuthenticated = STORE.auth.token;
  const location = useLocation();

  return (
    <StyledAppInner>
      {isAuthenticated ?
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='*' component={NotFound} />
        </Switch> :
        <Switch>
          <Route exact path='/signup' component={Authenticator} />
          <Route exact path='/login' component={Authenticator} />
          <Route path="*">
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          </Route>
        </Switch>
      }
    </StyledAppInner>
  )
}

export default withRouter(AppInner);