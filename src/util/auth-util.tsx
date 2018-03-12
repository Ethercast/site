import * as auth0 from 'auth0-js';
import { Auth0DecodedHash, Auth0UserProfile, AuthOptions } from 'auth0-js';
import * as moment from 'moment';
import { Scope } from '../debt/ethercast-backend-model';
import { CrossStorageClient } from 'cross-storage';
import * as _ from 'underscore';

const scope = Object.keys(Scope)
  .map(k => Scope[ k ])
  .concat([ 'openid', 'profile' ])
  .join(' ');

const AUTH_SETTINGS: AuthOptions = {
  domain: 'ethercast.auth0.com',
  clientID: 'Uz4zGr8VLnfDsQ4y5tRn0v09iw03X0KK',
  redirectUri: `${window.location.origin}/`,
  audience: 'https://api.ethercast.io',
  responseType: 'token id_token',
  scope
};

const auth = new auth0.WebAuth(AUTH_SETTINGS);

const AUTH_RESULT = 'auth_result';

const connectStorage = _.once(
  async function () {
    const storage = new CrossStorageClient(
      process.env.NODE_ENV === 'production' ?
        'https://ethercast.io/sso.html' :
        '/sso.html'
    );
    await storage.onConnect();
    return storage;
  }
);

async function setSession(authResult: Auth0DecodedHash | null): Promise<void> {
  const storage = await connectStorage();
  await storage.set(AUTH_RESULT, JSON.stringify(authResult));
}

async function removeSession(): Promise<void> {
  const storage = await connectStorage();
  await storage.del(AUTH_RESULT);
}

async function getSession(): Promise<Auth0DecodedHash | null> {
  const storage = await connectStorage();

  const sessionText = await storage.get(AUTH_RESULT);

  if (sessionText) {
    return JSON.parse(sessionText);
  }

  return null;
}

function getSessionDecodedHash(): Promise<Auth0DecodedHash> {
  return new Promise(async (resolve, reject) => {
    const existingSession = await getSession();

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

  const { idTokenPayload, accessToken } = hash;
  if (!accessToken) {
    throw new Error('no access token in the auth0 decoded hash');
  }

  if (!idTokenPayload) {
    throw new Error('no id token payload');
  }

  const { exp } = idTokenPayload;

  if (!exp) {
    throw new Error('no expiration on token');
  }

  if (moment(exp * 1000).isBefore(moment())) {
    throw new Error('token expired');
  }

  return new Promise((resolve, reject) => {
    auth.client.userInfo(
      accessToken,
      async function (err, user) {
        if (err) {
          console.error(err);
          await removeSession();
          reject(err);
        } else {
          await setSession(hash);
          resolve(user);
        }
      }
    );
  });
}

export default class Auth {
  static login(): void {
    auth.authorize({
      scope
    });
  }

  static async logout(): Promise<void> {
    await removeSession();
  }

  static async getUser(): Promise<Auth0UserProfile> {
    return getUserProfile();
  }

  static async getIdToken(): Promise<string | null> {
    const storedAuth = await getSession();
    if (!storedAuth) {
      return null;
    }

    const { idToken } = storedAuth;
    return idToken || null;
  };
}
