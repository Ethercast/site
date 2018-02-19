import { Button } from 'grommet';
import * as React from 'react';
import { HTMLProps } from 'react';
import { Condition, ConditionType } from '../util/model';
import * as _ from 'underscore';
import ConditionInput from './ConditionInput';

export interface LogicInputProps {
  value?: Partial<Condition>[][];
  onChange: (logic: Partial<Condition>[][]) => void;
}

const TAG_STYLE = {
  borderRadius: 5,
  background: 'lightgray',
  padding: 10,
  color: 'white',
  width: 70,
  margin: 5,
  textAlign: 'center',
  display: 'inline-block'
};

export function Separator({ style, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ ...TAG_STYLE, ...style }} {...props}/>
    </div>
  );
}

export default class LogicInput extends React.Component<LogicInputProps> {
  public render() {
    const { value, onChange } = this.props;

    return (
      <div>
        {
          _.map(
            value || [],
            (orConditions, andIx) => (
              <div key={andIx}>
                {
                  _.map(
                    orConditions,
                    (condition, orIx) => (
                      <ConditionInput value={condition} key={orIx} onChange={condition => null}/>
                    )
                  )
                }
                <Button
                  label="Add 'OR' condition"
                  onClick={() => {
                    onChange(
                      // copy the top array
                      (value || []).slice()
                      // replace the and array with a new array that has a new element
                        .splice(andIx, 1, [{}])
                    );
                  }}/>
              </div>
            )
          )
        }
        <div style={{ textAlign: 'center' }}>
          <Button
            label="Add 'AND' condition"
            onClick={
              () => onChange([
                ...(value || []),
                [{ type: ConditionType.address }]
              ])
            }
          />
        </div>
      </div>
    );
  }
}
