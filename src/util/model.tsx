export enum FilterType {
  address = 'address',
  topic0 = 'topic0',
  topic1 = 'topic1',
  topic2 = 'topic2',
  topic3 = 'topic3'
}

export const FILTER_TYPE_NAMES: {[key in FilterType]: string} = {
  address: 'Contract addresses',
  topic0: 'Method signatures',
  topic1: 'First indexed arguments',
  topic2: 'Second indexed arguments',
  topic3: 'Third indexed arguments'
};

// TODO: export & share from the backend
export enum SubscriptionStatus {
  active = 'active',
  pending = 'pending',
  deactivated = 'deactivated'
}

export type FilterOptionValue = string | string[] | null;
export type SubscriptionFilters = Partial<{[filterType in FilterType]: FilterOptionValue}>;

export interface Subscription {
  id: string; // uuid v4
  timestamp: number;
  user: string;
  name: string; // reasonable max length
  description?: string; // reasonable max length - longer
  webhookUrl: string;
  status: SubscriptionStatus;
  filters: SubscriptionFilters;
  subscriptionArn: string;
}

export interface WebhookReceiptResult {
  statusCode: number;
  success: boolean;
}

export interface WebhookReceipt {
  id: string;
  subscriptionId: string;
  url: string;
  timestamp: number;
  result: WebhookReceiptResult;
}
