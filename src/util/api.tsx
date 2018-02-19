import Auth from './auth';
import * as urlJoin from 'url-join';
import { Receipt, Subscription } from './model';

const API_URL = 'https://api.if-eth.com';

function fetchWithAuth(method: 'POST' | 'GET' | 'DELETE', path: string, body?: object, ri?: Request) {
  return fetch(
    urlJoin(API_URL, path),
    Object.assign(
      {},
      ri,
      {
        method,
        mode: 'cors',
        credentials: '',
        body: body ? JSON.stringify(body) : null,
        headers: Object.assign(
          {},
          (ri && ri.headers),
          {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Auth.getIdToken()}`
          }
        )
      }
    )
  ).then(
    async response => {
      const json = await response.json();

      if (response.status === 422) {
        throw new Error(
          `Validation errors: ${json.details.map(({ message }: any) => message).join(';')}`
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
  );
}

export function createSubscription(sub: Partial<Subscription>): Promise<Subscription> {
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

export function listReceipts(subscriptionId: string): Promise<Receipt[]> {
  return fetchWithAuth('GET', `/subscriptions/${subscriptionId}/receipts`);
}
