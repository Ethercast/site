import * as React from 'react';
import { netInfo } from '../util/net-info';

export default function EtherscanLink({ address }: { address: string }) {
  return netInfo && netInfo.etherscanUrl ? (
    <a href={`${netInfo.etherscanUrl}/address/${address}`} target="_blank">
      {address}
    </a>
  ) : <span>{address}</span>;
}
