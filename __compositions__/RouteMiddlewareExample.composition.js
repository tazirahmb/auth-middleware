import React from 'react';
import '@codex-by-telkom/component-library.helpers.utils.composition-setup';
import AuthMiddleware from '..';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import Button from '@codex-by-telkom/component-library.elements.button';

export function RouteMiddlewareExample() {
  const history = createMemoryHistory({ initialEntries: ['/logged-in'] });
  const dummyAuthToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJlY2VkMGFmNzNiYmU3MTk0ODkzODgiLCJlbWFpbCI6IndpamF5YW50b2FwQGNvZGV4LndvcmtzIiwicGhvbmVOdW1iZXIiOiIrNjI4Nzg3NTk0MzMyNSIsImZ1bGxOYW1lIjoiQnVrYW4gQWxiYXJpcWkiLCJyb2xlSWQiOnsiX2lkIjoiNWMxY2FhYTVmYjZmYzAwZWVlODQ0MjFkIiwidGl0bGUiOiJTdXBlciBBZG1pbiIsImxldmVsIjo5LCJzdGF0ZSI6IlNVUEVSX0FETUlOIiwidXNlclR5cGVJZCI6IjVjMTliZWVlNWExNjY1ZjYwNzNjMGNiNSJ9LCJ1c2VyVHlwZUlkIjp7Il9pZCI6IjVjMTliZWVlNWExNjY1ZjYwNzNjMGNiNSIsInRpdGxlIjoiVE0gTWVtYmVyIiwic3RhdGUiOiJUTV9NRU1CRVIiLCJfX3YiOjB9LCJjaGFwdGVyTmFtZUlkIjp7ImpvYlJvbGVJZHMiOltdfSwiaWF0IjoxNTk5NjI1OTE4LCJleHAiOjE2MDAwNTc5MTh9.7Tsbqt_RciwBNXcEbnMTog12tj46PH8i5hTc86woERE';
  const setToken = () =>
    window.localStorage.setItem('authToken', dummyAuthToken);
  const removeToken = () => window.localStorage.removeItem('authToken');

  const ROUTES = {
    LOGGED_IN: '/logged-in',
    AUTH: '/auth',
  };

  let authProps = {
    redirectTo: ROUTES.LOGGED_IN,
    routeType: 'UNAUTH',
  };

  if (window.localStorage.getItem('authToken')) {
    authProps = {
      redirectTo: ROUTES.AUTH,
      routeType: 'AUTH',
    };
  }

  return (
    <>
      <Router history={history}>
        <AuthMiddleware accessLevel={['SUPER_ADMIN']} {...authProps}>
          <Route exact path={ROUTES.LOGGED_IN}>
            <div>
              <div>this is real component</div>
              <Button
                text="go to login page"
                onClick={() => history.push(ROUTES.AUTH)}
              />
            </div>
          </Route>
          <Route exact path={ROUTES.AUTH}>
            <div>
              <div>this is unauth component</div>{' '}
              <Button
                text="go to auth page"
                onClick={() => history.push(ROUTES.LOGGED_IN)}
              />
            </div>
          </Route>
        </AuthMiddleware>
      </Router>
      <Button text="Add authToken" onClick={setToken} />
      <Button text="Remove authToken" onClick={removeToken} />
    </>
  );
}
