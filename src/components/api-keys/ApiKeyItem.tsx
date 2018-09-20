import * as React from 'react';
import { Button, Card, Checkbox, Input, Label } from 'semantic-ui-react';
import { EthercastTypes } from '@ethercast/model';

function ScopesList(props: {scopes: EthercastTypes.Scope[]}) {
  return (
    <Card.Group style={{margin: '0.5em'}}>
    {props.scopes.map((scope) => (
      <Card raised key={scope} color={'green'} style={{textAlign: 'center'}}>{scope}</Card>
    ))}
    </Card.Group>
  );
}

interface Props {
  apiKey: EthercastTypes.ApiKey;
  deleteApiKey: (id: string) => void;
}

export default class ApiKeyItem extends React.Component<Props, {revealSecret: boolean}> {
  state = { revealSecret: false };
  keyInput: HTMLInputElement | null;
  secretInput: HTMLInputElement | null;

  render() {
    const { id, name, scopes, secret } = this.props.apiKey;
    const { revealSecret } = this.state;

    const copy = (input: HTMLInputElement | null) => {
      if (input !== null) {
        const type = input.type;
        input.type = 'text';
        input.select();
        document.execCommand('Copy');
        input.type = type;
      }
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
              <Label content="Key" style={{ width: '5em' }}/>
              <input ref={el => this.keyInput = el}/>
              <Button color='teal' labelPosition='right' icon='copy'
                content='Copy Key' onClick={() => copy(this.keyInput)} style={{ width: '12em' }}/>
            </Input>
            <Input fluid action readOnly labelPosition='right' style={{ marginBottom: '1em' }}
              defaultValue={secret} type={revealSecret ? 'text' : 'password'}>
              <Label content='Secret' style={{ width: '5em' }}/>
              <input ref={el => this.secretInput = el}/>
              <Button color='pink' labelPosition='right' icon='copy'
                content='Copy Secret' onClick={() => copy(this.secretInput)} style={{ width: '12em' }}/>
            </Input>
            <div style={{ float: 'right', width: '12em' }}>
              Reveal Secret
              <Checkbox toggle checked={revealSecret}
                onChange={(e: any, {checked: revealSecret}: any) => this.setState({revealSecret})}
                style={{ float: 'right' }}/>
            </div>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}
