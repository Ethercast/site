import * as React from 'react';
import { HTMLProps } from 'react';

const TAG_STYLE = {
  borderRadius: 5,
  background: 'lightgray',
  padding: 10,
  color: 'white',
  width: 70,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block'
};

export default function Separator({ style, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ ...TAG_STYLE, ...style }} {...props}/>
    </div>
  );
}

export const AND_SEPARATOR = <Separator>AND</Separator>;
export const OR_SEPARATOR = <Separator>OR</Separator>;
