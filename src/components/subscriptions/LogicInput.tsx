import { Button } from 'grommet';
import * as React from 'react';
import { Condition, ConditionType } from '../../util/model';
import * as _ from 'underscore';
import { ConditionInputArray } from './ConditionInputArray';
import { AND_SEPARATOR } from './Separator';
import replaceItem from '../../util/replaceItem';

export interface LogicInputProps {
  logic?: Partial<Condition>[][];
  onChange: (logic: Partial<Condition>[][]) => void;
}


export default class LogicInput extends React.Component<LogicInputProps> {
  addCondition = () => this.props.onChange([
    ...(this.props.logic || []),
    [
      { type: ConditionType.address, value: '' }
    ]
  ]);

  public render() {
    const { logic, onChange } = this.props;

    const arr: Partial<Condition>[][] = logic || [];

    return (
      <div>
        {
          _.map(
            arr,
            (orConditions, ix, list) => (
              <div key={ix}>
                <div style={{ border: '1px solid rgba(0,0,0,0.2)', padding: 8 }}>
                  <ConditionInputArray
                    conditions={orConditions}
                    onChange={
                      conditions => {
                        if (conditions.length === 0) {
                          // remove the grouped or if there are no more conditions in the or statement
                          onChange(_.without(arr, orConditions));
                        } else {
                          onChange(replaceItem(conditions, arr, ix));
                        }
                      }
                    }
                  />
                </div>
                {
                  ix < list.length - 1 ? AND_SEPARATOR : null
                }
              </div>
            )
          )
        }

        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <Button label="Add 'AND' condition" onClick={this.addCondition}/>
        </div>
      </div>
    );
  }
}
