import * as React from 'react';
import { Condition, ConditionType } from '../../util/model';
import * as _ from 'underscore';
import ConditionInput from './ConditionInput';
import { OR_SEPARATOR } from './Separator';
import replaceItem from '../../util/replaceItem';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';

export function ConditionInputArray({ conditions, onChange }: { conditions: Partial<Condition>[], onChange: (conditions: Partial<Condition>[]) => void }) {
  return (
    <div>
      {
        conditions.map(
          (condition, ix) => (
            <div key={ix}>
              <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                  <ConditionInput
                    value={condition}
                    onChange={changed => {
                      onChange(replaceItem(changed, conditions, ix));
                    }}
                  />
                </div>

                <div style={{ flexShrink: 0, marginLeft: 10, alignSelf: 'flex-end' }}>
                  <Button
                    onClick={() => onChange(_.without(conditions, condition))}
                  >Remove condition</Button>
                </div>
              </div>

              {
                ix < conditions.length - 1 ? OR_SEPARATOR : null
              }
            </div>
          )
        )
      }

      <Button
        style={{ marginTop: 8 }}
        onClick={() => onChange(conditions.concat([{ type: ConditionType.address }]))}
      >Add 'OR' condition</Button>
    </div>
  );
}
