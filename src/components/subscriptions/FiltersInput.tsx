import * as React from 'react';
import { Form } from 'semantic-ui-react';
import TextArea from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import * as _ from 'underscore';
import { EthercastTypes } from '@ethercast/model';
import { commaSeparatedPattern } from '../../util/constants';
import { FILTER_TYPE_INFO } from '../../util/filter-type-names';
import FormComponent, { BaseFormProps } from '../FormComponent';

type SubscriptionFilters = EthercastTypes.LogSubscriptionFilters | EthercastTypes.TransactionSubscriptionFilters;

interface FiltersInputProps extends BaseFormProps<SubscriptionFilters> {
  type: EthercastTypes.SubscriptionType;
}

export default class FiltersInput extends FormComponent<SubscriptionFilters, FiltersInputProps> {
  render() {
    const { value, onChange, type } = this.props;

    const noneFilled = !value ||
      _.all(
        value,
        (typeValues) =>
          !typeValues ||
          (Array.isArray(typeValues) && typeValues.length === 0) ||
          (typeof typeValues === 'string' && typeValues.trim().length === 0)
      );

    const types = (type === 'log' ? EthercastTypes.LogFilterTypes : EthercastTypes.TransactionFilterTypes) as string[];

    return (
      <div>
        {
          types.map(
            (type, ix, list) => {
              const { name, valuePattern, placeholder } = FILTER_TYPE_INFO[type];
              const typeValue = value ? value[type] : '';

              const multiplePattern = commaSeparatedPattern(valuePattern);
              const multiplaceholder = `${placeholder}, ${placeholder}, ...`;

              const error = typeValue && typeValue.length > 0 && !multiplePattern.test(typeValue);

              return [
                <Form.Field
                  error={error}
                  key={type}
                >
                  <label htmlFor={`subscription-${name}`}>{name}</label>
                  <TextArea
                    id={`subscription-${name}`}
                    required={noneFilled}
                    type="text"
                    autoHeight
                    rows={2}
                    value={typeValue}
                    onChange={(e, data) => onChange({ ...value, [type]: data.value })}
                    placeholder={multiplaceholder}
                    pattern={multiplePattern}
                  />
                </Form.Field>,
                ix < list.length - 1 ? (
                  <div style={{ textAlign: 'center' }} key={`${type}-and`}><Label>AND</Label></div>
                ) : null
              ];
            }
          )
        }
      </div>
    );
  }
}