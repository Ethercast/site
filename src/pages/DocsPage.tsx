import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Divider, Grid, Header, Icon, Label } from 'semantic-ui-react';

enum HTTP {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

const createBadges = (repo: string, {definitions = false, source = false} = {definitions: true, source: true}) => {
  const defsHref = `https://docs.ethercast.io/${repo}/`;
  const repoHref = `https://github.com/Ethercast/${repo}`;

  return (
    <span style={{ marginLeft: '2rem' }}>
      {definitions &&
        <Label as='a' href={defsHref} color='blue'>
          <Icon name='book'/>
          Definitions
        </Label>
      }
      {source &&
        <Label as='a' href={repoHref} color='grey'>
          <Icon name='github'/>
          Source
        </Label>
      }
    </span>
  );
}

const createBackendLink = (expects: string) => {
  const href = `https://docs.ethercast.io/backend-model/interfaces/${expects.toLowerCase()}.html`;

  return (
    <a href={href}>{expects}</a>
  );
};

const createRoute = (verb: HTTP, path: string, expects?: string) => {
  return (
    <li>
    <Grid columns={3}>
    <Grid.Column style={{ width: '5rem' }}>
    <code><b>{verb}</b></code>
    </Grid.Column>
    <Grid.Column style={{ width: '10rem' }}>
    <code>{path}</code>
    </Grid.Column>
    <Grid.Column>
    {expects && createBackendLink(expects)}
    </Grid.Column>
    </Grid>
    </li>
  );
};

export default function Docs(props: RouteComponentProps<{}>) {
  return (
    <Container>
      <Header as='h2'>Documentation {createBadges('', {source: true})}</Header>
      <p>
        Ethercast lets you set up webhook subscriptions to events or transactions on the Ethereum Blockchain. Subscriptions can be set up throught the website, or using an API Key / Secret pair obtained through the website. This documentation covers how to interact with webhooks once you receive them, and how to subscribe to them through the API. If you want to create a subscription through the website, you can <a href='/subscriptions/new'>do that here</a>.
      </p>
      <p>
        Documentation is been generated from typescript sources to help you use, parse, and validate webhooks and the API. Click on the definitionss or source buttons in any section to see them.
      </p>
      <Divider/>
      <Header as='h3'>Webhooks</Header>
      <Header as='h4'>Parsing {createBadges('ethercast-model')}</Header>
      <p>
        Once you've made a subscription, you'll need to parse the incoming webhooks. Depending on the type of event you've subscribed to, you will either use the <a href='https://docs.ethercast.io/ethercast-model/interfaces/decodedlog.html'>DecodedLog</a> or <a href='https://docs.ethercast.io/ethercast-model/interfaces/decodedtransaction.html'>DecodedTransaction</a> interface. Note that the <code>ethercast</code> property of both contain the decoded ABI of the subscribed type.
      </p>
      <p>
        If you subscribed through the website, you should also have been able to see an example of your payload.
      </p>
      <Header as='h4'>Validation {createBadges('calculate-signature')}</Header>
      <p>
        All payloads are signed with a secret particular to each subscription. Payloads can be validated using this signature with the <a href='https://docs.ethercast.io/calculate-signature/globals.html#isvalidsignature'>isValidSignature</a> function.
      </p>
      <Divider/>
      <Header as='h3'>API Keys {createBadges('backend-model')}</Header>
      <p>
        You can do anything that can be done using the website through an API instead, using an API key. If you don't yet have an API key, you can <a href='/api-keys/new'>create one here</a>. API keys and especially their secrets should not be shared - these are most appropriate for server-to-server commumnication. The keys permission scopes should  also be restricted to only what you need to avoid accidental misuse.
      </p>
      <p>
        In order to send a request using the API, include your API key and secret in the request as the content of the <code>X-API-Key</code> and <code>X-API-Secret</code> headers, respectively. Make sure to send your request to the correct API - API keys will only work on the network for which they were generated. The mainnet API is served over https://api.ethercast.io. Test nets (as they become available) are served over https://{'{'}network-name{'}'}.api.ethercast.io.
      </p>
      <Header as='h4'>Available Routes</Header>
      <ul>
        <li>
          <Grid columns={3}>
            <Grid.Column style={{ width: '5rem' }}>
              <code><b>VERB</b></code>
            </Grid.Column>
            <Grid.Column style={{ width: '10rem' }}>
              <code>path</code>
            </Grid.Column>
            <Grid.Column>
              Expected body
            </Grid.Column>
          </Grid>
        </li>
        {createRoute(HTTP.POST, 'api-keys', 'CreateApiKeyRequest')}
        {createRoute(HTTP.GET, 'api-keys')}
        {createRoute(HTTP.DELETE, 'api-keys/{id}')}
        {createRoute(HTTP.POST, 'subscriptions', 'CreateSubscriptionRequest')}
        {createRoute(HTTP.GET, 'subscriptions')}
        {createRoute(HTTP.GET, 'subscriptions/{id}')}
        {createRoute(HTTP.GET, 'subscriptions/{id}/receipts')}
        {createRoute(HTTP.DELETE, 'subscriptions/{id}')}
        <li>
          <Grid columns={3}>
            <Grid.Column style={{ width: '5rem' }}>
              <code><b>{HTTP.POST}</b></code>
            </Grid.Column>
            <Grid.Column style={{ width: '10rem' }}>
              <code>get-examples</code>
            </Grid.Column>
            <Grid.Column>
              {'{'}
                type: <a href='https://docs.ethercast.io/backend-model/enums/subscriptiontype.html'>'SubscriptionType'</a>,
                filters: 
                  <a href='https://docs.ethercast.io/backend-model/globals.html#logsubscriptionfilters'>LogSubscriptionFilters</a>
                  |
                  <a href='https://docs.ethercast.io/backend-model/globals.html#transactionsubscriptionfilters'>TransactionSubscriptionFilters</a>
              {'}'}
            </Grid.Column>
          </Grid>
        </li>
      </ul>
    </Container>
  );
}
