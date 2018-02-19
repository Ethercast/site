import * as qs from 'qs';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as _ from 'underscore';
import SubscriptionList from '../components/subscriptions/SubscriptionList';
import { listSubscriptions } from '../util/api';
import mustBeLoggedIn from '../util/mustBeLoggedIn';
import { RouteComponentProps } from 'react-router';
import { Subscription } from '../util/model';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';

class ListSubscriptions extends React.Component<RouteComponentProps<{}>, { subscriptions: Subscription[] | null, promise: Promise<any> | null }> {
  state = {
    subscriptions: null,
    promise: null
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
        .catch(error => this.setState({ promise: null }))
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
    const { subscriptions, promise } = this.state;

    const { search } = history.location;

    let filteredSubs: Subscription[] = subscriptions || [];
    if (search && search.length > 1) {
      const { q } = qs.parse(search.substr(1));

      filteredSubs = _.filter(
        filteredSubs,
        ({ name, description }) => !q ||
          name.toLowerCase().indexOf(q) !== -1 ||
          description.toLowerCase().indexOf(q) !== -1
      );
    }

    return (
      <Container>
        <Header as="h2">My Subscriptions</Header>
        <div>
          <Input fluid placeholder="Search" onChange={this.handleChange}/>
          <Button as={Link} to="/subscriptions/new"><Icon name="add"/> Create</Button>
        </div>

        <Dimmer.Dimmable dimmed={promise !== null}>
          <Dimmer active={promise !== null}>
            <Loader>
              Loading...
            </Loader>
          </Dimmer>

          <SubscriptionList items={filteredSubs}/>
        </Dimmer.Dimmable>
      </Container>
    );
  }
}

export default withRouter(mustBeLoggedIn(ListSubscriptions));
