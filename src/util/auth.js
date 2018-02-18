import auth0 from 'auth0-js';

const auth = new auth0.WebAuth({
  domain: 'if-eth.auth0.com',
  clientID: '6HXoI5ljFO6IMsMttUAQbcjn7JGtDg9T',
  redirectUri: `${window.location.host}/auth/callback`,
  audience: 'https://if-eth.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
});

function setSession(authResult) {
  const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
}

function removeSession() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
}

class Auth {
  login = () => {
    auth.authorize();
  };

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      auth.parseHash(
        (err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
            resolve(authResult);
          } else if (err) {
            removeSession();
            console.error(err);
            reject(err);
          }
        }
      );
    });
  };

  getAccessToken = () => {
    return localStorage.getItem('id_token');
  };
}

export default new Auth();
