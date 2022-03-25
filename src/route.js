import React from 'react';

const SignIn = React.lazy(() => import('./Screen/Authentication/SignIn'));

const route = [
    { path: '/signin', exact: true, name: 'Masuk', component: SignIn }
];

export default route;