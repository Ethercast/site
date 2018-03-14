import { LogFilterType, TransactionFilterType } from '../debt/ethercast-backend-model';
import {
  ADDRESS_PATTERN,
  SIGNATURE_PATTERN,
  TOPIC_PATTERN,
  ZERO_ADDRESS,
  ZERO_SIGNATURE,
  ZERO_TOPIC
} from './constants';

export type SubscriptionFilterType = TransactionFilterType | LogFilterType;

export interface FilterTypeInfo {
  name: string;
  valuePattern: string;
  placeholder: string;
}

export const FILTER_TYPE_INFO: {[key in SubscriptionFilterType]: FilterTypeInfo} = {
  address: {
    name: 'Contract addresses', valuePattern: ADDRESS_PATTERN, placeholder: ZERO_ADDRESS
  },
  topic0: {
    name: 'Event signature', valuePattern: TOPIC_PATTERN, placeholder: ZERO_TOPIC
  },
  topic1: {
    name: 'First indexed arguments', valuePattern: TOPIC_PATTERN, placeholder: ZERO_TOPIC
  },
  topic2: {
    name: 'Second indexed arguments', valuePattern: TOPIC_PATTERN, placeholder: ZERO_TOPIC
  },
  topic3: {
    name: 'Third indexed arguments', valuePattern: TOPIC_PATTERN, placeholder: ZERO_TOPIC
  },
  from: {
    name: 'From address', valuePattern: ADDRESS_PATTERN, placeholder: ZERO_ADDRESS
  },
  to: {
    name: 'To address', valuePattern: ADDRESS_PATTERN, placeholder: ZERO_ADDRESS
  },
  methodSignature: {
    name: 'Method signature', valuePattern: SIGNATURE_PATTERN, placeholder: ZERO_SIGNATURE
  }
};
