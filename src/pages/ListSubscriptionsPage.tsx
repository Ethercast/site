import * as qs from 'qs';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SubscriptionList from '../components/subscriptions/SubscriptionList';
import { listSubscriptions } from '../util/api';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import { RouteComponentProps } from 'react-router';
import { EthercastTypes } from '@ethercast/model';
import { Button, Container, Dimmer, Header, Icon, Input, Loader, Message } from 'semantic-ui-react';
import * as _ from 'underscore';
import ClientPaginated from '../components/ClientPaginated';

function CreateButton(props: {}) {
  return (
    <Button size="big" primary as={Link} to="/subscriptions/new">
      <Icon name="add"/> Create
    </Button>
  );
}

interface State {
  subscriptions: EthercastTypes.Subscription[] | null;
  promise: Promise<any> | null;
  error: string | null;
}

class ListSubscriptionsPage extends React.Component<RouteComponentProps<{}>, State> {
  state = {
    subscriptions: null,
    promise: null,
    error: null
  };

  componentDidMount() {
    this.fetchSubs();
  }

  fetchSubs = () => {
    const { promise } = this.state;
    if (promise) {
      return;
    }

    this.setState({
      promise: listSubscriptions()
        .then(subscriptions => this.setState({ subscriptions, promise: null }))
        .catch(error => this.setState({ error: error.message, promise: null }))
    });
  };

  handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const { history } = this.props;

    history.replace({
      pathname: '/subscriptions',
      search: `q=${value}`
    });
  };

  render() {
    const { history } = this.props;
    const { subscriptions, promise, error } = this.state;

    const { search } = history.location;

    let filteredSubs: EthercastTypes.Subscription[] = subscriptions || [];

    let q = '';
    if (search && search.length > 1) {
      q = qs.parse(search.substr(1)).q || '';

      filteredSubs = _.filter(
        filteredSubs,
        ({ name }: EthercastTypes.Subscription) => !q || name.toLowerCase().indexOf(q) !== -1
      );
    }

    const loading = promise !== null;

    const groupedSorted = _.chain(filteredSubs)
      .groupBy('status')
      .mapObject(subs => _.sortBy(subs, ({ timestamp }: EthercastTypes.Subscription) => timestamp * -1))
      .value();

    const active = groupedSorted['active'] || [];
    const inactive = groupedSorted['deactivated'] || [];

    return (
      <Container>
        <Header as="h1">My subscriptions</Header>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <Input
              size="big"
              icon="search"
              placeholder="Search subscriptions"
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
              items={active.concat(inactive)}
              pageSize={12}>
              {
                items => {
                  return error !== null ? (
                    <Message negative>
                      <Message.Header>
                        Something went wrong...
                      </Message.Header>
                      <p>
                        We were not able to fetch your list of subscriptions: {error}
                      </p>
                    </Message>
                  ) : (
                    items.length === 0 ? (
                      q.length > 0 ? (
                        <Message>No matching subscriptions</Message>
                      ) : (
                        <Message>
                          You have not created any subscriptions. <Link to="/subscriptions/new">Click here</Link> to get
                          started.
                        </Message>
                      )
                    ) : <SubscriptionList items={items as EthercastTypes.Subscription[]}/>
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

export default withRouter(mustBeLoggedIn(ListSubscriptionsPage));
