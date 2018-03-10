import * as React from 'react';
import { Subscription, SubscriptionType } from '@ethercast/backend-model';
import { Button, Form, FormProps, Header, Input, TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FormComponent from '../FormComponent';
import FiltersInput from './FiltersInput';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import { SubscriptionPostRequest } from '../../../../backend-model/src/backend-model';

export interface SubscriptionFormProps extends FormProps {
  value: Partial<SubscriptionPostRequest>;
  onChange: (subscription: Partial<SubscriptionPostRequest>) => void;
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
  handleChange = (value: Partial<SubscriptionPostRequest>) =>
    this.props.onChange({ ...this.props.value, ...value });

  handleFiltersChange = (filters: any) => this.props.onChange({
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

          <Segment>
            <div style={{ textAlign: 'center' }}>
              <Button.Group>
                <Button
                  type="button"
                  positive={value && value.type === SubscriptionType.log}
                  onClick={() => this.handleChange({ type: SubscriptionType.log, filters: {} })}
                >
                  Logs
                </Button>
                <Button.Or/>
                <Button
                  type="button"
                  positive={value && value.type === SubscriptionType.transaction}
                  onClick={() => this.handleChange({ type: SubscriptionType.transaction, filters: {} })}
                >
                  Transactions
                </Button>
              </Button.Group>
            </div>

            <Divider/>

            <FiltersInput
              type={value && value.type ? value.type : SubscriptionType.log}
              value={value.filters}
              onChange={this.handleFiltersChange}
            />
          </Segment>
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button size="big" as={Link} to="/subscriptions">Cancel</Button>
          <Button size="big" type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
