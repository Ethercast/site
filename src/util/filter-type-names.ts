import { LogFilterType, TransactionFilterType } from '../debt/ethercast-backend-model';

export type SubscriptionFilter = TransactionFilterType | LogFilterType;

export const FILTER_TYPE_NAMES: {[key in SubscriptionFilter]: string} = {
  address: 'Contract addresses',
  topic0: 'Method signatures',
  topic1: 'First indexed arguments',
  topic2: 'Second indexed arguments',
  topic3: 'Third indexed arguments',
  from: 'From address',
  to: 'To address'
};
