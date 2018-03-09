import * as React from 'react';
import { ChangeEvent, ChangeEventHandler } from 'react';
import * as _ from 'underscore';

export interface BaseFormProps<TModel> {
  value?: Partial<TModel>;
  onChange: (changed: Partial<TModel>) => void;
}

export default abstract class FormComponent<TModel extends object, TProps extends BaseFormProps<TModel> = BaseFormProps<TModel>> extends React.PureComponent<TProps> {

  inputChangeHandler: (name: string) => ChangeEventHandler<HTMLInputElement> = _.memoize(
    (name: keyof TModel) => {
      return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, onChange } = this.props;

        onChange(Object.assign({}, value, { [name]: e.target.value }) as any);
      };
    }
  ) as any;

}
