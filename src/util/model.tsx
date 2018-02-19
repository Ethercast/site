export interface Subscription {
  id: string;
  name: string;
  description: string;
  webhookUrl: string;
  status: 'active' | 'deactivated';
  timestamp: number;
  logic: {
    type: 'address' | 'topic0' | 'topic1' | 'topic2' | 'topic3',
    value: string;
  }[][];
}

export interface Receipt {
  timestamp: number;
  id: string;
  successful: boolean;
}
