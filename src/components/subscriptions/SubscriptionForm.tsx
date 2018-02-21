import * as React from 'react';
import { Condition, Subscription } from '../../util/model';
import LogicInput from './LogicInput';
import { Button, Form, Header, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FormComponent from '../FormComponent';

export interface SubscriptionFormProps {
  value: Partial<Subscription>;
  onChange: (subscription: Partial<Subscription>) => void;
  onSubmit: () => void;
  loading: boolean;
}

class SubscriptionDetailsForm extends FormComponent<Subscription> {
  render() {
    return (
      <div>
        <Form.Field>
          <label>Name</label>
          <Input
            name="name"
            type="text"
            placeholder="My First Subscription"
            onChange={this.inputChangeHandler('name')}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            name="description"
            placeholder="Notify me when events happen"
            onChange={this.inputChangeHandler('description') as any}
          />
        </Form.Field>
        <Form.Field>
          <label>Webhook URL</label>
          <Input
            type="url"
            placeholder="https://my-domain.com/accept-webhook"
            onChange={this.inputChangeHandler('webhookUrl')}
            required
          />
        </Form.Field>
      </div>
    );
  }
}

export default class SubscriptionForm extends React.PureComponent<SubscriptionFormProps> {
  handleChange = (value: Partial<Subscription>) => this.props.onChange(value);

  handleLogicChange = (logic: Partial<Condition>[][]) => this.props.onChange({
    ...this.props.value,
    logic: logic as any
  });

  onSubmit = (e: any) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  public render() {
    const { value, loading } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <div>
          <SubscriptionDetailsForm value={value} onChange={this.handleChange}/>

          <Header as="h3">Subscription filters</Header>

          <LogicInput logic={value.logic} onChange={this.handleLogicChange}/>
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button as={Link} to="/subscriptions">Cancel</Button>
          <Button loading={loading} type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
