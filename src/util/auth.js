import auth0 from 'auth0-js';

const auth = new auth0.WebAuth({
  domain: 'if-eth.auth0.com',
  clientID: '6HXoI5ljFO6IMsMttUAQbcjn7JGtDg9T',
  redirectUri: `${window.location.protocol}//${window.location.host}/auth/callback`,
  audience: 'https://if-eth.auth0.com/userinfo',
  responseType: 'id_token',
  scope: 'openid'
});

const AUTH_RESULT = 'auth_result';

function setSession(authResult) {
  localStorage.setItem(AUTH_RESULT, JSON.stringify(authResult));
}

function removeSession() {
  localStorage.removeItem(AUTH_RESULT);
}

export default class Auth {
  static login() {
    auth.authorize();
  }

  static logout() {
    removeSession();
  }

  static handleAuthentication() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(AUTH_RESULT)) {
        resolve(localStorage.getItem(AUTH_RESULT));
      } else {
        auth.parseHash(
          (err, authResult) => {
            if (authResult && authResult.idToken) {
              setSession(authResult);
              resolve(authResult);
            } else if (err) {
              removeSession();
              console.error(err);
              reject(err);
            }
          }
        );
      }
    });
  };

  static getIdToken = () => {
    const storedAuth = localStorage.getItem(AUTH_RESULT);
    if (!storedAuth) {
      return null;
    }

    const { id_token } = JSON.parse(storedAuth);
    return id_token;
  };
}
