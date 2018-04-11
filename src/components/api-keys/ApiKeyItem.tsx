import * as React from 'react';
import { Button, Card, Checkbox, Input, Label } from 'semantic-ui-react';
import { ApiKey, Scope } from '../../debt/ethercast-backend-model';

function ScopesList(props: {scopes: Scope[]}) {
  return (
    <Card.Group style={{margin: '0.5em'}}>
    {props.scopes.map((scope) => (
      <Card raised key={scope} color={'green'} style={{textAlign: 'center'}}>{scope}</Card>
    ))}
    </Card.Group>
  );
}

interface Props {
  apiKey: ApiKey;
  deleteApiKey: (id: string) => void;
}

export default class ApiKeyItem extends React.Component<Props, {revealSecret: boolean}> {
  state = { revealSecret: false };

  render() {
    const { id, name, scopes, secret } = this.props.apiKey;
    const { revealSecret } = this.state;

    const copy = (e: any) => {
      e.target.previousElementSibling.select();
      document.execCommand('Copy');
    };

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>{name}</div>
            <div style={{ flexShrink: 0 }}>
              <Button negative onClick={() => this.props.deleteApiKey(id)}>Delete</Button>
            </div>
          </Card.Header>
          <Card.Description>
            <ScopesList scopes={scopes}/>
          </Card.Description>
          <Card.Content>
            <Input fluid action readOnly labelPosition='right' style={{ marginBottom: '1em' }}
              defaultValue={id}>
              <Label content="ID" style={{ width: '5em' }}/>
              <input/>
              <Button color='teal' labelPosition='right' icon='copy'
                content='Copy ID' onClick={copy} style={{ width: '12em' }}/>
            </Input>
            <Input fluid action readOnly labelPosition='right' style={{ marginBottom: '1em' }}
              defaultValue={secret} type={revealSecret ? 'text' : 'password'}>
              <Label content='Secret' style={{ width: '5em' }}/>
              <input/>
              <Button disabled={!revealSecret} color='pink' labelPosition='right' icon='copy'
                content='Copy Secret' onClick={copy} style={{ width: '12em' }}/>
            </Input>
            <Checkbox toggle checked={revealSecret} label='Reveal Secret'
              onChange={(e: any, {checked: revealSecret}: any) => this.setState({revealSecret})}
              style={{ float: 'right' }}/>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}
