import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { RouteProps } from 'react-router';

export function ProtectedRoute({ children, ...rest }: RouteProps) {

  const { isLoggedIn, userChecked } = useAppSelector((store) => store.user);

  if (localStorage.getItem('refreshToken') && !userChecked) return null;

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
