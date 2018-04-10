import * as React from 'react';
import { Button, Card, Input } from 'semantic-ui-react';
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

export default ({ apiKey, deleteApiKey }: Props) => {
  const { id, name, scopes, secret } = apiKey;

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
            <Button negative onClick={() => deleteApiKey(id)}>Delete</Button>
          </div>
        </Card.Header>
        <Card.Description>
          <ScopesList scopes={scopes}/>
        </Card.Description>
        <Card.Content>
          <Input fluid readOnly defaultValue={id}
            action={{ color: 'teal', labelPosition: 'right', icon: 'copy', content: 'Copy ID', onClick: copy, style: { width: '12em' } }}/>
          <Input fluid readOnly defaultValue={secret}
            action={{ color: 'pink', labelPosition: 'right', icon: 'copy', content: 'Copy Secret', onClick: copy, style: { width: '12em' } }}/>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};
