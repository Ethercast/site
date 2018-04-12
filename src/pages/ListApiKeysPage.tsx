import * as _ from 'underscore';
import * as qs from 'qs';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Button, Container, Dimmer, Header, Icon, Input, Loader, Message } from 'semantic-ui-react';
import { deleteApiKey, listApiKeys } from '../util/api';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import { ApiKey } from '../debt/ethercast-backend-model';
import ClientPaginated from '../components/ClientPaginated';
import ApiKeyList from '../components/api-keys/ApiKeyList';

function CreateButton(props: {}) {
  return (
    <Button size="big" primary as={Link} to="/api-keys/new">
      <Icon name="add"/> Create
    </Button>
  );
}

interface State {
  apiKeys: ApiKey[] | null;
  promise: Promise<any> | null;
  error: string | null;
}

class ListApiKeysPage extends React.Component<RouteComponentProps<{}>, State> {
  state = {
    apiKeys: null,
    promise: null,
    error: null
  };

  componentDidMount() {
    this.fetchApiKeys();
  }

  fetchApiKeys = () => {
    const { promise } = this.state;
    if (promise) {
      return;
    }

    this.setState({
      promise: listApiKeys()
        .then(apiKeys => this.setState({ apiKeys, promise: null }))
        .catch(error => this.setState({ error: error.message, promise: null }))
    });
  };

  deleteApiKey = (id: string) => {
    if (!confirm(`Delete API Key ${id}?`)) {
      return;
    }

    const { promise } = this.state;
    if (promise) {
      return;
    }

    this.setState({
      promise: deleteApiKey(id)
        .then(() => {
          this.setState({ promise: null });
          this.fetchApiKeys();
        })
        .catch(error => this.setState({ error: error.message, promise: null }))
    });
  };

  handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const { history } = this.props;

    history.replace({
      pathname: '/api-keys',
      search: `q=${value}`
    });
  };

  render() {
    const { history } = this.props;
    const { apiKeys, promise, error } = this.state;

    const { search } = history.location;

    let filteredKeys: ApiKey[] = apiKeys || [];

    let q = '';
    if (search && search.length > 1) {
      q = qs.parse(search.substr(1)).q || '';

      filteredKeys = _.filter(
        filteredKeys,
        ({ name }: ApiKey) => !q || name.toLowerCase().indexOf(q) !== -1
      );
    }

    const loading = promise !== null;

    return (
      <Container>
        <Header as="h1">My API Keys</Header>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <Input
              size="big"
              icon="search"
              placeholder="Search API keys"
              fluid
              onChange={this.handleChange}
              value={q}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <CreateButton/>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Dimmer.Dimmable>
            <Dimmer active={loading} inverted>
              <Loader active={loading}>Loading</Loader>
            </Dimmer>

            <ClientPaginated
              items={filteredKeys}
              pageSize={12}>
              {
                items => {
                  return error !== null ? (
                    <Message negative>
                      <Message.Header>
                        Something went wrong...
                      </Message.Header>
                      <p>
                        We were not able to fetch your list of API keys: {error}
                      </p>
                    </Message>
                  ) : (
                    items.length === 0 ? (
                      q.length > 0 ? (
                        <Message>No matching API keys</Message>
                      ) : (
                        <Message>
                          You have not created any API keys. <Link to="/api-keys/new">Click here</Link> to get started.
                        </Message>
                      )
                    ) : <ApiKeyList items={items as ApiKey[]} deleteApiKey={this.deleteApiKey}/>
                  );
                }
              }
            </ClientPaginated>
          </Dimmer.Dimmable>
        </div>

      </Container>
    );
  }
};

export default withRouter(mustBeLoggedIn(ListApiKeysPage));
