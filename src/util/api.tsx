import * as urlJoin from 'url-join';
import { EthercastTypes } from '@ethercast/model';
import Auth from './auth-util';
import { netInfo } from './net-info';

async function fetchWithAuth(method: 'POST' | 'GET' | 'DELETE', path: string, body?: object, parse: boolean = true) {
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
          throw new Error('Your token has expired');
        }

        let json;
        if (parse) json = await response.json();

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

export function createApiKey({name, scopes}: EthercastTypes.CreateApiKeyRequest): Promise<EthercastTypes.ApiKey> {
  return fetchWithAuth('POST', '/api-keys', {name, scopes});
}

export function listApiKeys(): Promise<EthercastTypes.ApiKey[]> {
  return fetchWithAuth('GET', '/api-keys');
}

export function deleteApiKey(id: string): Promise<void> {
  return fetchWithAuth('DELETE', `/api-keys/${id}`, undefined, false);
}

export function createSubscription(sub: object): Promise<EthercastTypes.TransactionSubscription | EthercastTypes.LogSubscription> {
  return fetchWithAuth('POST', '/subscriptions', sub);
}

export function listSubscriptions(): Promise<(EthercastTypes.LogSubscription | EthercastTypes.TransactionSubscription)[]> {
  return fetchWithAuth('GET', '/subscriptions');
}

export function getSubscription(id: string): Promise<(EthercastTypes.LogSubscription | EthercastTypes.TransactionSubscription)> {
  return fetchWithAuth('GET', `/subscriptions/${id}`);
}

export async function deactivateSubscription(id: string): Promise<void> {
  await fetchWithAuth('DELETE', `/subscriptions/${id}`);
}

export function listReceipts(subscriptionId: string): Promise<EthercastTypes.WebhookReceipt[]> {
  return fetchWithAuth('GET', `/subscriptions/${subscriptionId}/receipts`);
}

export function getExamples(request: { type: EthercastTypes.SubscriptionType, filters: EthercastTypes.TransactionSubscriptionFilters | EthercastTypes.LogSubscriptionFilters }): Promise<object> {
  return fetchWithAuth('POST', `/get-examples`, request);
}
