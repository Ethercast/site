import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { Subscription } from '../util/model';
import { Button, FormField, FormFields } from 'grommet';
import LogicInput from './LogicInput';

export interface SubscriptionFormProps {
  value: Partial<Subscription>;
  onChange: (subscription: Partial<Subscription>) => void;
  onSubmit: () => void;
}

export default class SubscriptionForm extends React.Component<SubscriptionFormProps> {
  public render() {
    const { onChange, value } = this.props;
    const changed = (more: object) => onChange({ ...value, ...more });
    const oc = (name: string): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => e => changed({ [name]: e.target.value });

    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.props.onSubmit();
      }}>
        <FormFields>
          <FormField label="Name">
            <input name="name" type="text" placeholder="My First Subscription" onChange={oc('name')} required/>
          </FormField>
          <FormField label="Description">
            <textarea name="description" placeholder="Notify me when events happen" onChange={oc('description')}/>
          </FormField>
          <FormField label="Webhook URL">
            <input type="url" placeholder="https://my-domain.com/accept-webhook" onChange={oc('webhookUrl')} required/>
          </FormField>
          <FormField label="Logic">
            <LogicInput value={value.logic} onChange={logic => changed({ logic })}/>
          </FormField>
        </FormFields>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button label="Submit" type="submit" primary={true}/>
        </div>
      </form>
    );
  }
}
