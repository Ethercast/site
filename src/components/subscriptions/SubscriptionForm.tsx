import * as React from 'react';
import { Subscription, SubscriptionFilters } from '../../util/model';
import { Button, Form, FormProps, Header, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FormComponent from '../FormComponent';
import FiltersInput from './FiltersInput';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

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

  handleFiltersChange = (filters: SubscriptionFilters) => this.props.onChange({
    ...this.props.value,
    filters
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

          <Header as="h2">
            Subscription filters <Label color="yellow">enter at least one</Label>
          </Header>

          <FiltersInput value={value.filters} onChange={this.handleFiltersChange}/>
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button size="big" as={Link} to="/subscriptions">Cancel</Button>
          <Button size="big" type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
