import * as React from 'react';
import { HTMLProps } from 'react';
import { Subscription } from '../util/model';
import { Button, FormField, FormFields } from 'grommet';

export interface SubscriptionFormProps {
  value: Partial<Subscription>;
  onChange: (subscription: Partial<Subscription>) => void;
  onSubmit: () => void;
}

export const TYPE_OPTIONS = [
  { value: 'address', label: 'Address' },
  { value: 'topic0', label: 'Method Signature' },
  { value: 'topic1', label: 'First Argument' },
  { value: 'topic2', label: 'Second Argument' },
  { value: 'topic3', label: 'Third Argument' }
];

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

export function Separator({ style, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ ...TAG_STYLE, ...style }} {...props}/>
    </div>
  );
}

export default class SubscriptionForm extends React.Component<SubscriptionFormProps> {
  public render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.props.onSubmit();
      }}>
        <FormFields>
          <FormField label="Name">
            <input name="name" type="text" placeholder="My First Subscription" required/>
          </FormField>
          <FormField label="Description">
            <textarea name="description" placeholder="Notify me when events happen" required/>
          </FormField>
          <FormField label="Webhook URL">
            <input type="text" placeholder="https://my-domain.com/accept-webhook" required/>
          </FormField>
        </FormFields>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button label="Submit" type="submit" primary={true}/>
        </div>
      </form>
    );
  }
}
