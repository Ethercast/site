import * as React from 'react';
import { Condition, ConditionType } from '../../util/model';
import * as _ from 'underscore';
import ConditionInput from './ConditionInput';
import { OR_SEPARATOR } from './Separator';
import replaceItem from '../../util/replaceItem';
import { Button } from 'semantic-ui-react';

export function ConditionInputArray({ conditions, onChange }: { conditions: Partial<Condition>[], onChange: (conditions: Partial<Condition>[]) => void }) {
  return (
    <div>
      {
        conditions.map(
          (condition, ix) => (
            <div key={ix}>
              <ConditionInput
                value={condition}
                onChange={changed => {
                  onChange(replaceItem(changed, conditions, ix));
                }}
              />

              <Button
                style={{ marginTop: 8 }}
                negative
                icon="trash"
                type="button"
                onClick={() => onChange(_.without(conditions, condition))}>
                Remove condition
              </Button>

              {
                ix < conditions.length - 1 ? OR_SEPARATOR : null
              }
            </div>
          )
        )
      }

      <Button
        style={{ marginTop: 8 }}
        type="button"
        onClick={() => onChange(conditions.concat([{ type: ConditionType.address }]))}>
        Add 'OR' condition
      </Button>
    </div>
  );
}
