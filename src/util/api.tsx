import * as urlJoin from 'url-join';
import { LogSubscription, TransactionSubscription, WebhookReceipt } from '../debt/ethercast-backend-model';
import Auth from './auth-util';
import { netInfo } from './net-info';

if (!netInfo || !netInfo.enabled) {
  alert('sorry, this network is not yet supported!');
  window.location.href = 'https://ethercast.io';
}

async function fetchWithAuth(method: 'POST' | 'GET' | 'DELETE', path: string, body?: object) {
  const token: string | null = await Auth.getAccessToken();

  if (!token) {
    throw new Error('unauthorized request');
  }

  const requestInfo: RequestInit = {
    method,
    mode: 'cors',
    cache: 'default',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  if (!netInfo) {
    return new Promise(() => null);
  }

  return fetch(urlJoin(netInfo.apiUrl, path), requestInfo)
    .then(
      async response => {
        if (response.status === 204) {
          return;
        }

        if (response.status === 401) {
          console.log('error response');
          throw new Error('You are not logged in');
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

export function createSubscription(sub: object): Promise<TransactionSubscription | LogSubscription> {
  return fetchWithAuth('POST', '/subscriptions', sub);
}

export function listSubscriptions(): Promise<(LogSubscription | TransactionSubscription)[]> {
  return fetchWithAuth('GET', '/subscriptions');
}

export function getSubscription(id: string): Promise<(LogSubscription | TransactionSubscription)> {
  return fetchWithAuth('GET', `/subscriptions/${id}`);
}

export async function deactivateSubscription(id: string): Promise<void> {
  await fetchWithAuth('DELETE', `/subscriptions/${id}`);
}

export function listReceipts(subscriptionId: string): Promise<WebhookReceipt[]> {
  return fetchWithAuth('GET', `/subscriptions/${subscriptionId}/receipts`);
}
