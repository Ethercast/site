import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Heading from 'grommet/components/Heading';
import AddIcon from 'grommet/components/icons/base/Add';
import CloseIcon from 'grommet/components/icons/base/Close';
import Select from 'grommet/components/Select';
import Toast from 'grommet/components/Toast';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import _ from 'underscore';

const TYPE_OPTIONS = [
  { value: 'address', label: 'Address' },
  { value: 'topic0', label: 'Method Signature' },
  { value: 'topic1', label: 'First Argument' },
  { value: 'topic2', label: 'Second Argument' },
  { value: 'topic3', label: 'Third Argument' }
];

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

function Separator({ style, ...props }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ ...TAG_STYLE, ...style }} {...props}/>
    </div>
  );
}

let NewSubscription = props => {
  const { handleSubmit, style, submitSucceeded } = props;


  const makeRenderConditionFields = (parentIndex) => {
    const renderConditionFields = ({ fields, meta: { error, submitFailed } }) => {
      if (fields.length === 0) {
        fields.push({});
      }

      return (
        <div>
          <Box colorIndex="light-2">
            {fields.map((condition, index) => {
              const inputStyle = {
                marginBottom: '0px'
              };

              const SelectField = ({ input: { value, onChange } }) => {
                return (
                  <Select
                    placeHolder='None'
                    options={TYPE_OPTIONS}
                    value={_.findWhere(TYPE_OPTIONS, { value })}
                    onChange={(changeEvent) => {
                      onChange(changeEvent.value.value);
                    }}
                    style={{
                      background: 'white',
                      width: '100%',
                      height: '75px'
                    }}
                  />
                );
              };

              return (<div key={index}>
                <FormFields>
                  {index > 0 ? <div style={{ textAlign: 'center' }}>
                    <div style={{ padding: '7.5px', ...TAG_STYLE }}>OR</div>
                  </div> : null}
                  <Box direction="row">
                    <Field
                      name={`${condition}.type`}
                      type="text"
                      component={SelectField}
                      style={{
                        ...inputStyle,
                        position: 'relative'
                      }}
                    />
                    <FormField
                      label="Value"
                      style={{ ...inputStyle, ...{ position: 'relative' } }}
                    >
                      <Field
                        name={`${condition}.value`}
                        type="text"
                        component="input"
                        placeholder="0x0000000000000000000000000000000000000000"
                      />
                      {fields.length > 1 && index !== 0 ? <Button
                        style={{ position: 'absolute', right: '0px', top: '0px' }}
                        type="button"
                        icon={<CloseIcon/>}
                        onClick={() => fields.remove(index)}/> : null}
                    </FormField>

                  </Box>
                </FormFields>
                {index === fields.length - 1 ? <Button
                  icon={<AddIcon/>}
                  onClick={() => fields.push({})}
                  plain={false}
                  style={{ marginLeft: '10px' }}
                >Add 'OR' condition</Button> : null}
              </div>);
            })}
          </Box>
        </div>);
    };
    return renderConditionFields;
  };

  const renderLogicFields = ({ fields, meta: { error, submitFailed } }) => {
    if (fields.length === 0) {
      fields.push({});
    }
    return (<div>
      <Heading tag="h3" style={{ marginTop: '10px' }}>
        {fields.length > 0 ? 'Filters' : null}
      </Heading>
      {fields.map((logic, index) => {
        return (
          <div key={`logic-${index}`} style={{ position: 'relative' }}>
            {index > 0 ? <Separator>AND</Separator> : null}
            <Box style={{
              border: '1px solid rgba(0,0,0,.15)',
              borderRadius: '2px',
              position: 'relative'
            }} key={index}>
              <FieldArray name={`${logic}.conditions`}
                          component={makeRenderConditionFields(index)}/>
              {fields.length > 1 && index !== 0 ? <Button
                style={{ position: 'absolute', right: '0px', bottom: '0px' }}
                type="button"
                icon={<CloseIcon/>}
                onClick={() => fields.remove(index)}/> : null}
            </Box>
          </div>);
      })}
      <Button
        icon={<AddIcon/>}
        onClick={() => fields.push({})}
        label="Add 'AND' condition"
        style={{ marginTop: '10px' }}
      />
    </div>);
  };

  return (
    <Box flex={true} align='center' direction='column' responsive={true} pad='small'>
      <Form style={style} onSubmit={handleSubmit}>
        <div>
          {submitSucceeded ? <Toast status='ok'>Subscription successfully created.</Toast> : null}
          <Heading tag="h2">Create Subscription</Heading>
          <FormField label="Name">
            <Field name="name" component="input" type="text" placeholder="My First Subscription"/>
          </FormField>
          <FormField label="Description">
            <Field name="description" component="textarea"
                   placeholder="Notify me when events happen"/>
          </FormField>
          <FormField label="Webhook URL">
            <Field name="webhookUrl" component="input" type="text"
                   placeholder="https://my-domain.com/accept-webhook"/>
          </FormField>
          <FieldArray name="logic" component={renderLogicFields}/>
        </div>
        <div style={{ padding: 10, textAlign: 'right' }}>
          <Button label='Submit'
                  type='submit'
                  primary={true}
                  onClick={handleSubmit}/>
        </div>
      </Form>
    </Box>
  );
};

NewSubscription = reduxForm({
  form: 'newSubscription'
})(NewSubscription);

export default NewSubscription;
