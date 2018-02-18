import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Select from 'grommet/components/Select';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import AddIcon from 'grommet/components/icons/base/Add';
import CloseIcon from 'grommet/components/icons/base/Close';
import Toast from 'grommet/components/Toast';
import Label from 'grommet/components/Label';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

let NewSubscription = props => {
  const { handleSubmit, style, submitSucceeded } = props;

  const tagStyle = {
    borderRadius: '5px',
    background: 'lightgray',
    padding: '10px',
    color: 'white',
    margin: '0 auto',
    width: '70px',
    margin: '5px',
    textAlign: 'center',
  }

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
              marginBottom: '0px',
            };

            const SelectField = ({ input: { value, onChange } }) => {
              return (
                <Select placeHolder='None'
                options={[
                  { value: 'address', label: 'Address'},
                  { value: 'topic0', label: 'Method Signature' },
                  { value: 'topic1', label: 'First Argument' },
                  { value: 'topic1', label: 'Second Argument' },
                  { value: 'topic1', label: 'Third Argument' },
                ]}
                value={value}
                onChange={(option) => onChange(option.value)}
                style={{
                  background: 'white',
                  width: '100%',
                  height: '75px',
                }}
                />
              );
            }

            return (<div key={index}>
                <FormFields>
                  {index > 0 ? <div style={{padding: '7.5px', ...tagStyle }}>OR</div> : null}
                  <Box direction="row">
                      <Field
                        name={`${condition}.type`}
                        type="text"
                        component={SelectField}
                        style={{
                          ...inputStyle,
                          position: 'relative',
                        }}
                      />
                      <FormField
                        label="Value"
                        style={inputStyle}
                      >
                        <Field
                          name={`${condition}.value`}
                          type="text"
                          component="input"
                        />
                      </FormField>

                  </Box>
                </FormFields>
              {index === fields.length - 1 ? <Button
                icon={<AddIcon/>}
                onClick={() => fields.push({})}
                plain={false}
              >Add Condition</Button> : null}
            </div>);
          })}
          </Box>
        </div>);
    };
    return renderConditionFields;
  };

  const renderLogicFields = ({ fields, meta: { error, submitFailed } }) => (
    <div>
      <Heading tag="h3" style={{marginTop: '10px'}}>
        {fields.length > 0 ? 'Filters' : null}
      </Heading>
      {fields.map((logic, index) => {
        return (
          <div>
            {index > 0 ?<div style={{ marginTop: '10px', ...tagStyle }}>
               AND
            </div> : null}
            <Box style={{
              border: '1px solid rgba(0,0,0,.15)',
              borderRadius: '2px',
              position: 'relative'
            }} key={index}>
              <FieldArray name={`${logic}.conditions`}
                          component={makeRenderConditionFields(index)}/>
            </Box>
          </div>);
      })}
      <Button
        onClick={() => fields.push({})}
        primary={false}
        label='Add Filter'
        box={true}
        style={{ marginTop: '10px' }}
      />
    </div>
  );

  return (
    <Box flex={true} align='center' direction='column' responsive={true} pad='small'>
    <Form style={style} onSubmit={handleSubmit}>
      <div>
        {submitSucceeded ? <Toast status='ok'>Subscription successfully created.</Toast> : null}
        <Heading tag="h2">
          Create Subscription
        </Heading>
        <FormField label="Name">
          <Field name="name" component="input" type="text" placeholder="My First Subscription"/>
        </FormField>
        <FormField label="Webhook URL">
          <Field name="webhookUrl" component="input" type="text" placeholder="https://my-domain.com/accept-webhook"/>
        </FormField>
        <FieldArray name="logic" component={renderLogicFields}/>
      </div>
      <Footer pad={{ 'vertical': 'medium' }}>
        <Button label='Submit'
                type='submit'
                primary={true}
                onClick={handleSubmit}/>
      </Footer>
    </Form>
    </Box>
  );
};

NewSubscription = reduxForm({
  form: 'newSubscription'
})(NewSubscription);

export default NewSubscription;
