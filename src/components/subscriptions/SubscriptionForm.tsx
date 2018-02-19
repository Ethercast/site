import * as React from 'react';
import { Subscription } from '../../util/model';
import LogicInput from './LogicInput';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import TextArea from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

export interface SubscriptionFormProps {
  value: Partial<Subscription>;
  onChange: (subscription: Partial<Subscription>) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default class SubscriptionForm extends React.Component<SubscriptionFormProps> {
  public render() {
    const { onChange, value, loading } = this.props;
    const changed = (more: object) => onChange({ ...value, ...more });
    const oc = (name: string): any => (e: any) => changed({ [name]: e.target.value });

    return (
      <Form onSubmit={e => {
        e.preventDefault();
        this.props.onSubmit();
      }}>
        <div>
          <Form.Field>
            <label>Name</label>
            <Input
              name="name" type="text" placeholder="My First Subscription" onChange={oc('name')}
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
          <Button loading={loading} type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
