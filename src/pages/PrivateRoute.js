import React from 'react';
import { Navigate } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const PrivateRoute = ({ component }) => {
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => <Navigate to="/" />
	});
	return <Component />;
};
export default PrivateRoute;
