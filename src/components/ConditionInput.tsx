import { FormField, FormFields } from 'grommet';
import * as React from 'react';
import { Condition, CONDITION_NAMES, ConditionType } from '../util/model';
import * as _ from 'underscore';

export interface ConditionInputProps {
  value: Partial<Condition>;
  onChange: (logic: Partial<Condition>) => void;
}

const ZERO_ADDRESS = `0x${_.range(0, 40).map(() => '0').join('')}`;
const ZERO_TOPIC = `0x${_.range(0, 64).map(() => '0').join('')}`;

export default class ConditionInput extends React.Component<ConditionInputProps> {
  public render() {
    const { value, onChange } = this.props;

    return (
      <FormFields>
        <FormField label="Type">
          <select
            onChange={e => onChange({ ...value, type: e.target.value as ConditionType })}
            value={value.type}
            required
          >
            {
              Object.keys(ConditionType)
                .map(
                  (conditionType) => (
                    <option key={conditionType} value={conditionType}>
                      {CONDITION_NAMES[conditionType]}
                    </option>
                  )
                )
            }
          </select>
        </FormField>
        <FormField label={`${CONDITION_NAMES[value.type || ConditionType.address]} value`}>
          <input
            type="text"
            onChange={e => onChange({ ...value, value: e.target.value })}
            placeholder={value.type === ConditionType.address ? ZERO_ADDRESS : ZERO_TOPIC}
            pattern={`0x[a-fA-F0-9]{${value.type === ConditionType.address ? 40 : 64}}`}
            required
          />
        </FormField>
      </FormFields>
    );
  }
}
