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

// replace an item in an array
function replaceItem<T>(item: T, items?: T[], index?: number): T[] {
  const copy: T[] = items ? items.slice() : [];

  if (!index) {
    copy.push(item);
  } else {
    copy[index] = item;
  }

  return copy;
}

export function Separator({ style, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ ...TAG_STYLE, ...style }} {...props}/>
    </div>
  );
}

function ConditionInputArray({ conditions, onChange }: { conditions: Partial<Condition>[], onChange: (conditions: Partial<Condition>[]) => void }) {
  return (
    <div>
      {
        conditions.map(
          (condition, ix) => (
            <div key={ix}>
              <ConditionInput
                value={condition}
                onChange={changed => {
                  const copy = conditions.slice();
                  copy[ix] = changed;
                  onChange(copy);
                }}
              />
              <Button label="Remove condition" onClick={() => onChange(_.without(conditions, condition))}/>
              {
                ix < conditions.length - 1 ? <Separator>OR</Separator> : null
              }
            </div>
          )
        )
      }
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
            (orConditions, ix) => (
              <div key={ix}>
                <ConditionInputArray
                  conditions={orConditions}
                  onChange={conditions => {
                    if (conditions.length > 0) {
                      onChange(replaceItem<Partial<Condition>[]>(conditions, value, ix));
                    } else {
                      onChange(_.without((value || []), orConditions));
                    }
                  }}
                />
                <Button
                  label="Add 'OR' condition"
                  onClick={() => {
                    onChange(replaceItem<Partial<Condition>[]>([{ type: ConditionType.address }], value));
                  }}/>

                {
                  ix < (value || []).length - 1 ? <Separator>AND</Separator> : null
                }
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
