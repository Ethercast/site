export enum ConditionType {
  address = 'address', topic0 = 'topic0', topic1 = 'topic1', topic2 = 'topic2', topic3 = 'topic3'
}

export const CONDITION_NAMES: {[key in ConditionType]: string} = {
  address: 'Contract address',
  topic0: 'Method signature',
  topic1: 'First indexed argument',
  topic2: 'Second indexed argument',
  topic3: 'Third indexed argument'
};

export interface Condition {
  type: ConditionType,
  value: string;
}

export type SubscriptionLogic = Condition[][];

export interface Subscription {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  status: 'active' | 'deactivated';
  timestamp: number;
  logic: SubscriptionLogic;
}

export interface Receipt {
  timestamp: number;
  id: string;
  successful: boolean;
}
