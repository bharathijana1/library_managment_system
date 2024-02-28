import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'js-cookie';

const PrivateRoutes = () => {
  const token = Cookie.get('jwt_token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet  />;
};

export default PrivateRoutes;
