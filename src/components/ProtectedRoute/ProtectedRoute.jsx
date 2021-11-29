import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth, getUserRequest } = useSelector(state => state.user);

  if (getUserRequest) return null;
  return <Route {...rest} render={({ location }) => (isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />)} />;
};
