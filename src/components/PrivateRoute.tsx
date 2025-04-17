import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';

// PrivateRoute component
// This component ensures that only authenticated users can access certain routes.
interface Props {
  children: React.ReactNode; // The child components to render if the user is authenticated
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // Access the user state from the Redux store
  const user = useSelector((state: RootState) => state.user);

  // If the user is not authenticated (missing name or email), redirect to the login page
  if (!user.name || !user.email) {
    return <Navigate to="/auth" replace />;
  }

  // If the user is authenticated, render the child components
  return <>{children}</>;
};

export default PrivateRoute;
