import * as React from 'react';

export default function EtherscanLink({ address }: { address: string }) {
  return (
    <a href={`https://etherscan.io/address/${address}`} target="_blank">
      {address}
    </a>
  );
}
