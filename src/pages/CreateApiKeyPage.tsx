import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Dimmer, Header, Loader, Message } from 'semantic-ui-react';
import ApiKeyForm from '../components/api-keys/ApiKeyForm';
import { EthercastTypes } from '@ethercast/model';
import { createApiKey } from '../util/api';
import mustBeLoggedIn from '../util/mustBeLoggedIn';

interface State {
  apiKey: EthercastTypes.CreateApiKeyRequest,
  error: Error | null;
  promise: Promise<any> | null;
}

class CreateApiKeyPage extends React.Component<RouteComponentProps<{}>, State> {
  createApiKey = () => {
    this.setState({
      promise: createApiKey(this.state.apiKey)
        .then(
          (apiKey) => {
            this.props.history.push(`/api-keys`);
          }
        )
        .catch(
          (error: any) => {
            this.setState({ error, promise: null });
          }
        )
    });
  };

  state = {
    apiKey: {
      name: '',
      scopes: [EthercastTypes.Scope.READ_SUBSCRIPTION]
    },
    promise: null,
    error: null
  };

  removeMessage = () => this.setState({ error: null });

  render() {
    const { apiKey, error, promise } = this.state;

    return (
      <Container>
        <Dimmer.Dimmable>
          <Dimmer active={!!promise} inverted>
            <Loader active={!!promise}/>
          </Dimmer>

          <Header as="h1">Create API key</Header>
          <ApiKeyForm
            value={apiKey}
            onChange={apiKey => this.setState({ apiKey })}
            onSubmit={this.createApiKey}
          />
        </Dimmer.Dimmable>

        {
          error !== null ? (
              <Message negative onDismiss={this.removeMessage}>
                {(error as any).message}
              </Message>
            ) :
            null
        }
      </Container>
    );
  }
}

export default mustBeLoggedIn(CreateApiKeyPage);
