import React from 'react';
import Auth from '../../utilities/auth.js';

const auth = new Auth();

export default () => {
  if (typeof window !== 'undefined' && /access_token|id_token|error/.test(window.location.hash)) {
    auth.handleAuthentication();
  }

  return (
    <div>logging you in</div>
  );
}
