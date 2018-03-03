import Auth from './auth-util';
import * as urlJoin from 'url-join';
import { Subscription, WebhookReceipt } from './model';

const URL_MAPPING = {
  'localhost:3000': 'https://api.ethercast.io',
  // 'ropsten.ethercast.io': 'https://ropsten.api.ethercast.io',
  'kovan.ethercast.io': 'https://kovan.api.ethercast.io',
  'rinkeby.ethercast.io': 'https://rinkeby.api.ethercast.io',
  'mainnet.ethercast.io': 'https://api.ethercast.io'
};

const API_URL = URL_MAPPING[window.location.host.toLowerCase()];
if (!API_URL) {
  window.location.href = 'https://ethercast.io';
}

function fetchWithAuth(method: 'POST' | 'GET' | 'DELETE', path: string, body?: object) {
  const requestInfo: RequestInit = {
    method,
    mode: 'cors',
    cache: 'default',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Auth.getIdToken()}`
    }
  };

  return fetch(urlJoin(API_URL, path), requestInfo)
    .then(
      async response => {
        if (response.status === 204) {
          return;
        }

        const json = await response.json();

        if (response.status === 422) {
          throw new Error(
            `Validation errors: ${json.error.details.map(({ message }: any) => message).join(';')}`
          );
        }

        if (response.status > 300) {
          if (json.message) {
            throw new Error(json.message);
          }
          throw new Error(JSON.stringify(json));
        }

        return json;
      }
    )
    .catch(
      error => {
        console.error('failed request', error);
        throw error;
      }
    );
}

export function createSubscription(sub: object): Promise<Subscription> {
  return fetchWithAuth('POST', '/subscriptions', sub);
}

export function listSubscriptions(): Promise<Subscription[]> {
  return fetchWithAuth('GET', '/subscriptions');
}

export function getSubscription(id: string): Promise<Subscription> {
  return fetchWithAuth('GET', `/subscriptions/${id}`);
}

export async function deactivateSubscription(id: string): Promise<void> {
  await fetchWithAuth('DELETE', `/subscriptions/${id}`);
}

export function listReceipts(subscriptionId: string): Promise<WebhookReceipt[]> {
  return fetchWithAuth('GET', `/subscriptions/${subscriptionId}/receipts`);
}
