import { FILTER_TYPE_NAMES, FilterType, SubscriptionFilters } from '../../util/model';
import FormComponent from '../FormComponent';
import * as React from 'react';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { Form } from 'semantic-ui-react';
import * as _ from 'underscore';

const ZERO_ADDRESS = `0x${_.range(0, 40).map(() => '0').join('')}`;
const ZERO_TOPIC = `0x${_.range(0, 64).map(() => '0').join('')}`;

const ADDRESS_PATTERN = `0x[a-fA-F0-9]{40}`;
const TOPIC_PATTERN = `0x[a-fA-F0-9]{64}`;

export default class FiltersInput extends FormComponent<SubscriptionFilters> {
  render() {
    const { value, onChange } = this.props;

    return (
      <div>
        {
          Object.keys(FilterType)
            .map(
              type => {
                return (
                  <Form.Field key={type}>
                    <label>{FILTER_TYPE_NAMES[type]}</label>
                    <Input
                      type="text"
                      onChange={(e, data) => onChange({ ...value, [type]: data.value })}
                      placeholder={type === FilterType.address ? ZERO_ADDRESS : ZERO_TOPIC}
                      pattern={type === FilterType.address ? ADDRESS_PATTERN : TOPIC_PATTERN}
                    />
                  </Form.Field>
                );
              }
            )
        }
      </div>
    );
  }
}