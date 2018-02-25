import * as React from 'react';
import { Condition, Subscription } from '../../util/model';
import LogicInput from './LogicInput';
import { Button, Form, FormProps, Header, Input, Message, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FormComponent from '../FormComponent';

export interface SubscriptionFormProps extends FormProps {
  value: Partial<Subscription>;
  onChange: (subscription: Partial<Subscription>) => void;
  onSubmit: () => void;
}

class SubscriptionDetailsForm extends FormComponent<Subscription> {
  render() {
    return (
      <div>
        <Form.Field required>
          <label>Name</label>
          <Input
            name="name"
            type="text"
            placeholder="My First Subscription"
            onChange={this.inputChangeHandler('name')}
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>Webhook URL</label>
          <Input
            type="url"
            placeholder="https://my-domain.com/accept-webhook"
            onChange={this.inputChangeHandler('webhookUrl')}
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
    const { value, onChange, ...rest } = this.props;

    return (
      <Form size="big" {...rest} onSubmit={this.onSubmit}>
        <div>
          <SubscriptionDetailsForm value={value} onChange={this.handleChange}/>

          <Header as="h2">Subscription filters</Header>

          <LogicInput logic={value.logic} onChange={this.handleLogicChange}/>

          {
            value && value.logic && value.logic.length > 0 ? null : (
              <Message negative>
                You must have at least one subscription filter to continue.
              </Message>
            )
          }
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button size="big" as={Link} to="/subscriptions">Cancel</Button>
          <Button size="big" type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
