import * as React from 'react';
import { HTMLProps } from 'react';

export default function Ellipsis({ style, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      style={{
        ...style,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
      {...props}
    />
  );
}