// copied from v0.0.7
export enum SubscriptionStatus {
  active = 'active',
  deactivated = 'deactivated'
}

export enum SubscriptionType {
  log = 'log',
  transaction = 'transaction'
}

export enum LogFilterType {
  address = 'address',
  topic0 = 'topic0',
  topic1 = 'topic1',
  topic2 = 'topic2',
  topic3 = 'topic3'
}

export enum TransactionFilterType {
  from = 'from',
  to = 'to'
}

export type FilterOptionValue = string | string[] | null;
export type LogSubscriptionFilters = {[filterType in LogFilterType]?: FilterOptionValue};
export type TransactionSubscriptionFilters = {[filterType in TransactionFilterType]?: FilterOptionValue};

export interface Subscription {
  id: string; // uuid v4
  type: SubscriptionType;
  timestamp: number;
  secret: string;
  user: string;
  name: string; // reasonable max length
  description?: string; // reasonable max length - longer
  webhookUrl: string;
  status: SubscriptionStatus;
  subscriptionArn: string;
}

export interface LogSubscription extends Subscription {
  type: SubscriptionType.log;
  filters: LogSubscriptionFilters;
}

export interface TransactionSubscription extends Subscription {
  type: SubscriptionType.transaction;
  filters: TransactionSubscriptionFilters;
}

export interface CreateSubscriptionRequest extends Pick<Subscription, 'name' | 'description' | 'webhookUrl'> {
  filters: LogSubscriptionFilters | TransactionSubscriptionFilters;
}

export interface CreateTransactionSubscriptionRequest extends CreateSubscriptionRequest {
  type: SubscriptionType.transaction,
  filters: TransactionSubscriptionFilters
}

export interface CreateLogSubscriptionRequest extends CreateSubscriptionRequest {
  type: SubscriptionType.log,
  filters: LogSubscriptionFilters
}

export interface WebhookReceiptResult {
  statusCode: number;
  success: boolean;
  error?: string;
}

export interface WebhookReceipt {
  id: string;
  subscriptionId: string;
  ttl: number;
  url: string;
  timestamp: number;
  result: WebhookReceiptResult;
}

export interface CreateApiKeyRequest {
  scopes: Set<Scope>;
}

export interface ApiKey extends CreateApiKeyRequest {
  user: string;
  secret: string;
}

export enum Scope {
  READ_SUBSCRIPTION = 'read:subscription',
  CREATE_SUBSCRIPTION = 'create:subscription',
  DEACTIVATE_SUBSCRIPTION = 'deactivate:subscription',
  CREATE_API_KEY = 'create:apiKey',
  DEACTIVATE_API_KEY = 'deactivate:apiKey'
}
