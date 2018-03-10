import {
  LogFilterType,
  LogSubscriptionFilters,
  SubscriptionType,
  TransactionFilterType,
  TransactionSubscriptionFilters
} from '@ethercast/backend-model';
import FormComponent, { BaseFormProps } from '../FormComponent';
import * as React from 'react';
import { Form } from 'semantic-ui-react';
import * as _ from 'underscore';
import TextArea from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import { FILTER_TYPE_NAMES } from '../../util/filter-type-names';

const ZERO_ADDRESS = `0x${_.range(0, 40).map(() => '0').join('')}`;
const ZERO_TOPIC = `0x${_.range(0, 64).map(() => '0').join('')}`;

const ADDRESS_PLACEHOLDER = `${ZERO_ADDRESS}, ${ZERO_ADDRESS}, ...`;
const TOPIC_PLACEHOLDER = `${ZERO_TOPIC}, ${ZERO_TOPIC}, ...`;

const ADDRESS_PATTERN = `0x[a-fA-F0-9]{40}`;
const TOPIC_PATTERN = `0x[a-fA-F0-9]{64}`;

function commaSeparatedPattern(pattern: string) {
  const withWhitespace = `\\s*${pattern}\\s*`;

  return new RegExp(`^${withWhitespace}(,${withWhitespace})*$`);
}

const ADDRESSES_PATTERN = commaSeparatedPattern(ADDRESS_PATTERN);
const TOPICS_PATTERN = commaSeparatedPattern(TOPIC_PATTERN);

type SubscriptionFilters = LogSubscriptionFilters | TransactionSubscriptionFilters;

interface FiltersInputProps extends BaseFormProps<SubscriptionFilters> {
  type: SubscriptionType;
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

    return (
      <div>
        {
          Object.keys(type === SubscriptionType.log ? LogFilterType : TransactionFilterType)
            .map(
              (type, ix, list) => {
                const isAddress = type === LogFilterType.address || type === TransactionFilterType.from || type === TransactionFilterType.to;
                const typeValue = value ? value[ type ] : '';

                const error = Boolean(
                  typeValue && typeValue.length > 0 &&
                  (
                    isAddress ? !ADDRESSES_PATTERN.test(typeValue) : !TOPICS_PATTERN.test(typeValue)
                  )
                );

                return [
                  <Form.Field
                    error={error}
                    key={type}
                  >
                    <label>{FILTER_TYPE_NAMES[ type ]}</label>
                    <TextArea
                      required={noneFilled && isAddress}
                      type="text"
                      autoHeight
                      rows={2}
                      value={typeValue}
                      onChange={(e, data) => onChange({ ...value, [ type ]: data.value })}
                      placeholder={isAddress ? ADDRESS_PLACEHOLDER : TOPIC_PLACEHOLDER}
                      pattern={isAddress ? ADDRESSES_PATTERN : TOPICS_PATTERN}
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