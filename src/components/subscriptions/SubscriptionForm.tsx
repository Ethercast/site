import * as React from 'react';
import { Subscription } from '../../util/model';
import LogicInput from './LogicInput';
import { Button, Form, Header, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface SubscriptionFormProps {
  value: Partial<Subscription>;
  onChange: (subscription: Partial<Subscription>) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default class SubscriptionForm extends React.Component<SubscriptionFormProps> {
  public render() {
    const { onSubmit, onChange, value, loading } = this.props;
    const changed = (more: object) => onChange({ ...value, ...more });
    const oc = (name: string): any => (e: any) => changed({ [name]: e.target.value });

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        debugger;

        onSubmit();
      }}>
        <div>
          <Form.Field>
            <label>Name</label>
            <Input
              name="name"
              type="text"
              placeholder="My First Subscription"
              onChange={oc('name')}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea name="description" placeholder="Notify me when events happen"
                      onChange={oc('description')}/>
          </Form.Field>
          <Form.Field>
            <label>Webhook URL</label>
            <Input
              type="url" placeholder="https://my-domain.com/accept-webhook"
              onChange={oc('webhookUrl')} required/>
          </Form.Field>
          <hr/>
          <Header as="h3">Subscription filters</Header>
          <LogicInput logic={value.logic} onChange={logic => changed({ logic })}/>
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button as={Link} to="/subscriptions">Cancel</Button>
          <Button loading={loading} type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
