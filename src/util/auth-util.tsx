import * as auth0 from 'auth0-js';
import { Auth0DecodedHash, Auth0UserProfile } from 'auth0-js';

const AUTH_SETTINGS = {
  domain: 'if-eth.auth0.com',
  clientID: '6HXoI5ljFO6IMsMttUAQbcjn7JGtDg9T',
  redirectUri: `${window.location.protocol}//${window.location.host}/`,
  audience: 'https://if-eth.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'profile subscriptions:read subscriptions:deactivate subscriptions:create'
};

const auth = new auth0.WebAuth(AUTH_SETTINGS);

const AUTH_RESULT = 'auth_result';

function setSession(authResult: Auth0DecodedHash | null) {
  localStorage.setItem(AUTH_RESULT, JSON.stringify(authResult));
}

function removeSession(): void {
  localStorage.removeItem(AUTH_RESULT);
}

function getSession(): Auth0DecodedHash | null {
  const sessionText = localStorage.getItem(AUTH_RESULT);

  if (sessionText) {
    return JSON.parse(sessionText);
  }

  return null;
}

function getSessionDecodedHash(): Promise<Auth0DecodedHash> {
  const existingSession = getSession();

  return new Promise((resolve, reject) => {
    auth.parseHash(
      (err, authResult) => {
        if (authResult && authResult.idToken) {
          resolve(authResult);
        } else {
          if (err) {
            console.error(err);
            if (existingSession) {
              resolve(existingSession);
            } else {
              reject();
            }
          } else {
            // if there's a valid existing session, use it
            if (existingSession) {
              resolve(existingSession);
            } else {
              reject();
            }
          }
        }
      }
    );
  });
}

async function getUserProfile(): Promise<any> {
  const hash = await getSessionDecodedHash();

  const { accessToken } = hash;
  if (!accessToken) {
    throw new Error('no access token in the auth0 decoded hash');
  }

  return new Promise((resolve, reject) => {
    auth.client.userInfo(
      accessToken,
      function (err, user) {
        if (err) {
          console.error(err);
          removeSession();
          reject(err);
        } else {
          setSession(hash);
          resolve(user);
        }
      }
    );
  });
}

export default class Auth {
  static login() {
    auth.authorize();
  }

  static logout() {
    removeSession();
  }

  static async getUser(): Promise<Auth0UserProfile> {
    return getUserProfile();
  }

  static getIdToken(): string | null {
    const storedAuth = getSession();
    if (!storedAuth) {
      return null;
    }

    const { idToken } = storedAuth;
    return idToken || null;
  };
}
