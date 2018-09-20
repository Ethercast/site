import * as _ from 'underscore';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, FormProps, Input, Segment } from 'semantic-ui-react';
import { EthercastTypes } from '@ethercast/model';
import FormComponent from '../FormComponent';

export interface ApiKeyFormProps extends FormProps {
  value: EthercastTypes.CreateApiKeyRequest;
  onChange: (apiKey: EthercastTypes.CreateApiKeyRequest) => void;
  onSubmit: () => void;
}

class SubscriptionDetailsForm extends FormComponent<EthercastTypes.CreateApiKeyRequest> {
  scopeChangeHandler = _.memoize(
    (scope: EthercastTypes.Scope) => {
      return (e: any, {checked}: any) => {
        const { value, onChange } = this.props;

        let scopes = (value as EthercastTypes.CreateApiKeyRequest).scopes
          .filter(name => name !== scope);
        if (checked) {
          scopes.push(scope);
        }

        onChange(Object.assign({}, value, { scopes }) as any);
      }
    }
  );

  render() {
    const { value } = this.props;
    const scopes = (value as EthercastTypes.CreateApiKeyRequest).scopes;

    return (
      <div>
        <Form.Field required>
          <label htmlFor="api-key-name">Name</label>
          <Input
            id="api-key-name"
            name="name"
            type="text"
            placeholder="API Key Name"
            onChange={this.inputChangeHandler('name')}
            value={value && value.name || ''}
            required
          />
        </Form.Field>
        <Segment>
          {Object.keys(EthercastTypes.Scope).map((scope) => {
            const checked = scopes.indexOf(EthercastTypes.Scope[scope]) !== -1;
            // While scopes are simple, labels can be generated dynamically
            const label = scope
              .split('_')
              .map((val, key, ary) => val === 'API' ? val : val[0] + val.substr(1).toLowerCase())
              .join(' ')
              + 's';
            return (
              <Form.Field control={Checkbox} toggle checked={checked} label={label}
                onChange={this.scopeChangeHandler(EthercastTypes.Scope[scope])} key={scope}
              />
            )
          })}
        </Segment>
      </div>
    );
  }
}

export default class SubscriptionForm extends React.PureComponent<ApiKeyFormProps> {
  handleChange = (changes: EthercastTypes.CreateApiKeyRequest) => {
    this.props.onChange({ ...this.props.value, ...changes } as any);
  };

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
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button size="big" as={Link} to="/api-keys">Cancel</Button>
          <Button size="big" type="submit" primary={true}>Submit</Button>
        </div>
      </Form>
    );
  }
}
