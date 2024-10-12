import React from 'react';
import PropTypes from 'prop-types';
import {
  getToken,
  removeToken,
  setExpired,
  setRedirectLink,
} from '@codex-by-telkom/component-library.helpers.utils.auth-helpers';
import Error404 from '@codex-by-telkom/component-library.elements.negative-page.error-404';
import { BASE_URL } from '@codex-by-telkom/general-module.modules.base-url';
import moment from 'moment';

const USER_LOGIN = `${BASE_URL}/auth/login`;

function AuthMiddleware({
  children,
  redirectTo = USER_LOGIN,
  routeType = 'AUTH',
  accessLevel = [],
}) {
  // role/accessLevel

  const { roleId = null, exp } = getToken(true);
  const token = getToken();
  let role = '';

  if (roleId) {
    role = roleId ? roleId.state : null;

    if (routeType !== 'UNAUTH' && !accessLevel.includes(role))
      return <Error404 isPage />;
  } else if (routeType !== 'UNAUTH') setRedirectLink(window.location.href);

  // accesslevel data: array of string
  // role: string (always)
  // to see list value of accessLevel, open user filter container

  // only enter this route when role included in props accessLevel
  // or routeType is unauth
  const isCorrectRoute = () =>
    (roleId && routeType === 'AUTH') || (!roleId && routeType === 'UNAUTH');

  if (!isCorrectRoute()) {
    window.location.href = redirectTo.split('?')[0];
    return null;
  }

  if (token && moment.unix(exp).isBefore()) {
    removeToken();
    setRedirectLink(window.location.href);
    setExpired();

    window.location.href = USER_LOGIN;
  }

  return children;
}

AuthMiddleware.propTypes = {
  /** link route untuk redirect jika typenya redirect, atau tipenya auth tetapi blm login/ unauth tapi sudah login  */
  redirectTo: PropTypes.string,
  /** array akses level yang dapat mengakses komponen atau rute ini.  */
  accessLevel: PropTypes.array,
  /** tipe routenya. `AUTH` untuk rute yang hanya dapat diakses jika sudah login, dan `UNAUTH` untuk tipe rute yang hanya bisa diakses jika user belum login  */
  routeType: PropTypes.oneOf(['AUTH', 'UNAUTH']),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
};

export default AuthMiddleware;
