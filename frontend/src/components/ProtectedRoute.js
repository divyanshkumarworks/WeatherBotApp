import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.user,
});

export default connect(mapStateToProps)(ProtectedRoute);