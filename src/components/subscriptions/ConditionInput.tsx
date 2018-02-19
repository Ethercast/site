import * as React from 'react';
import { Condition, CONDITION_NAMES, ConditionType } from '../../util/model';
import * as _ from 'underscore';
import { Form } from 'semantic-ui-react';
import Select from 'semantic-ui-react/dist/commonjs/addons/Select/Select';

export interface ConditionInputProps {
  value: Partial<Condition>;
  onChange: (logic: Partial<Condition>) => void;
}

const CONDITION_TYPE_OPTIONS = Object.keys(ConditionType)
  .map(conditionType => ({
    text: CONDITION_NAMES[conditionType],
    value: conditionType
  }));

const ZERO_ADDRESS = `0x${_.range(0, 40).map(() => '0').join('')}`;
const ZERO_TOPIC = `0x${_.range(0, 64).map(() => '0').join('')}`;

export default class ConditionInput extends React.Component<ConditionInputProps> {
  public render() {
    const { value, onChange } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flexShrink: 0 }}>
          <Form.Field>
            <label>Type</label>
            <Select
              onChange={(e,data) => onChange({ ...value, type: data.value as ConditionType })}
              value={value.type}
              options={CONDITION_TYPE_OPTIONS}
              required
            />
          </Form.Field>
        </div>
        <div style={{ flexGrow: 1, marginLeft: 8 }}>
          <Form.Field>
            <label>{CONDITION_NAMES[value.type || ConditionType.address]} value</label>
            <input
              style={{ width: '100%' }}
              type="text"
              onChange={e => onChange({ ...value, value: e.target.value })}
              placeholder={value.type === ConditionType.address ? ZERO_ADDRESS : ZERO_TOPIC}
              pattern={`0x[a-fA-F0-9]{${value.type === ConditionType.address ? 40 : 64}}`}
              required
            />
          </Form.Field>
        </div>
      </div>
    );
  }
}
