import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getAccessToken, isAuthed } from '../data/SpotifyAuth';

export type PrivateRouteProps = {
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  outlet: JSX.Element;
};

const useAuth = () => {
  return getAccessToken() && isAuthed();
};

export default function PrivateRoute({
  authenticationPath,
  redirectPath,
  setRedirectPath,
  outlet,
}: PrivateRouteProps) {
  const currentLocation = useLocation();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(currentLocation.pathname);
    }
  }, [isAuthenticated, setRedirectPath, currentLocation]);

  if (isAuthenticated && redirectPath === currentLocation.pathname) {
    return outlet;
  } else {
    return (
      <Navigate
        to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }}
      />
    );
  }
}
