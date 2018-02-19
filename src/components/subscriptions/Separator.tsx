import * as React from 'react';
import { HTMLProps } from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

export default function Separator({ children }: HTMLProps<HTMLDivElement>) {
  return (
    <div style={{ textAlign: 'center', margin: 8 }}>
      <Label>{children}</Label>
    </div>
  );
}

export const AND_SEPARATOR = <Separator>AND</Separator>;
export const OR_SEPARATOR = <Separator>OR</Separator>;
