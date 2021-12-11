import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProps } from 'react-router';

export function ProtectedRoute({ children, ...rest }: RouteProps) {

  const { isLoggedIn } = useSelector( (store: any) => store.user);

  return (
    <Route {...rest} render={({ location }) =>
      isLoggedIn ?
        (children) :
        (<Redirect to={{
          pathname: "/login",
          state: { from: location },
        }} />)
    } />
  );
}
