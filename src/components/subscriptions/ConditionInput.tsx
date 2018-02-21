import * as React from 'react';
import { Condition, CONDITION_NAMES, ConditionType } from '../../util/model';
import * as _ from 'underscore';
import { Form, Input, Select } from 'semantic-ui-react';
import FormComponent from '../FormComponent';


const CONDITION_TYPE_OPTIONS = Object.keys(ConditionType)
  .map(conditionType => ({
    text: CONDITION_NAMES[conditionType],
    value: conditionType
  }));

const ZERO_ADDRESS = `0x${_.range(0, 40).map(() => '0').join('')}`;
const ZERO_TOPIC = `0x${_.range(0, 64).map(() => '0').join('')}`;

export default class ConditionInput extends FormComponent<Condition> {
  public render() {
    const { value, onChange } = this.props;

    return (
      <div>
        <Form.Field required>
          <label>Type</label>
          <Select
            onChange={(e, data) => onChange({ ...value, type: data.value as ConditionType })}
            value={value && value.type}
            options={CONDITION_TYPE_OPTIONS}
            required
          />
        </Form.Field>
        <Form.Field required>
          <label>{CONDITION_NAMES[value && value.type || ConditionType.address]} value</label>
          <Input
            style={{ width: '100%' }}
            type="text"
            onChange={(e, data) => onChange({ ...value, value: data.value })}
            placeholder={value && value.type === ConditionType.address ? ZERO_ADDRESS : ZERO_TOPIC}
            pattern={`0x[a-fA-F0-9]{${value && value.type === ConditionType.address ? 40 : 64}}`}
            required
          />
        </Form.Field>
      </div>
    );
  }
}
