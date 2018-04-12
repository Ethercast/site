import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Divider, Header, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

enum HTTP {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

interface BadgeLinksProps {
  repo: string;
  definitions?: boolean;
  source?: boolean;
}

const BadgeLinks = ({ repo, definitions = true, source = true }: BadgeLinksProps) => {
  const defsHref = `https://docs.ethercast.io/${repo}/`;
  const repoHref = `https://github.com/Ethercast/${repo}`;

  return (
    <span style={{ marginLeft: '1rem' }}>
      {
        definitions ? (
          <Label as='a' href={defsHref} color='blue'>
            <Icon name='book'/> Definitions
          </Label>
        ) : null
      }
      {
        source ? (
          <Label as='a' href={repoHref} color='grey'>
            <Icon name='github'/> Source
          </Label>
        ) : null
      }
    </span>
  );
};

const BackEndLink = ({ expects }: { expects: string }) => {
  const href = `https://docs.ethercast.io/backend-model/interfaces/${expects.toLowerCase()}.html`;

  return (
    <a href={href}>{expects}</a>
  );
};

const APIRouteRow = ({ verb, path, expects }: { verb: HTTP, path: string, expects?: string }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <code><b>{verb}</b></code>
      </Table.Cell>
      <Table.Cell>
        <code>{path}</code>
      </Table.Cell>
      <Table.Cell>
        {expects ? <BackEndLink expects={expects}/> : null}
      </Table.Cell>
    </Table.Row>
  );
};

export default function Docs(props: RouteComponentProps<{}>) {
  return (
    <Container>
      <Header as='h2'>Documentation <BadgeLinks repo="" definitions={false} source/></Header>
      <p>
        Ethercast allows you to set up subscriptions to events or transactions on the Ethereum Blockchain.
        Subscriptions can be set up throught the website, or using an API Key / Secret pair obtained through the
        website. This documentation covers how to interact with webhooks once you receive them, and how to subscribe to
        them through the API. If you want to create a subscription through the website,
        you can <Link to="/subscriptions/new">do that here</Link>.
      </p>
      <p>
        Documentation is generated from TypeScript sources to help you use, parse, and validate webhooks and the
        API. Click on the definitions or source buttons in any section to see them.
      </p>
      <Divider/>
      <Header as='h3'>Webhooks</Header>
      <Header as='h4'>Parsing <BadgeLinks repo="ethercast-model"/></Header>
      <p>
        Once you've made a subscription, you'll need to parse the incoming webhooks. Depending on the type of event
        you've subscribed to, you will either use the <a
        href='https://docs.ethercast.io/ethercast-model/interfaces/decodedlog.html'>DecodedLog</a> or <a
        href='https://docs.ethercast.io/ethercast-model/interfaces/decodedtransaction.html'>DecodedTransaction</a> interface.
        Note that the <code>ethercast</code> property of both contain the decoded ABI of the subscribed type.
      </p>
      <p>
        If you subscribed through the website, you should also have been able to see an example of your payload.
      </p>
      <Header as='h4'>Validation <BadgeLinks repo="calculate-signature"/></Header>
      <p>
        All payloads are signed with a secret particular to each subscription. Payloads can be validated using this
        signature with the <a
        href='https://docs.ethercast.io/calculate-signature/globals.html#isvalidsignature'>isValidSignature</a> function.
      </p>
      <Divider/>
      <Header as='h3'>API Keys <BadgeLinks repo="backend-model"/></Header>
      <p>
        You can do anything that can be done using the website through an API instead, using an API key. If you don't
        yet have an API key, you can <Link to="/api-keys/new">create one here</Link>. API keys and especially their
        secrets should not be shared - these are most appropriate for server-to-server commumnication.
        The keys permission scopes should also be restricted to only what you need to avoid accidental misuse.
      </p>
      <p>
        Requests sent to the API must include an Authorization header with the api key and secret:
        <br/>
        <code>Authorization: api-key API_KEY:API_SECRET</code>
      </p>
      <p>
        Make sure to send your request to the correct API - API keys will only work on the network for which they were generated.
        <br/>
        The mainnet API is served over https://api.ethercast.io. Test nets (as they become available) are served over https://{'{'}network-name{'}'}.api.ethercast.io.
      </p>
      <Header as='h4'>Available Routes</Header>
      <Table>
        <Table.Header>
          <Table.HeaderCell>
            <code><b>VERB</b></code>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <code>path</code>
          </Table.HeaderCell>
          <Table.HeaderCell>
            Expected body
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          <APIRouteRow verb={HTTP.POST} path="api-keys" expects="CreateApiKeyRequest"/>
          <APIRouteRow verb={HTTP.GET} path="api-keys"/>
          <APIRouteRow verb={HTTP.DELETE} path="api-keys/{id}"/>
          <APIRouteRow verb={HTTP.POST} path="subscriptions" expects="CreateSubscriptionRequest"/>
          <APIRouteRow verb={HTTP.GET} path="subscriptions"/>
          <APIRouteRow verb={HTTP.GET} path="subscriptions/{id}"/>
          <APIRouteRow verb={HTTP.GET} path="subscriptions/{id}/receipts"/>
          <APIRouteRow verb={HTTP.DELETE} path="subscriptions/{id}"/>
          <APIRouteRow verb={HTTP.POST} path="get-examples" expects="GetExampleRequest"/>
        </Table.Body>
      </Table>
    </Container>
  );
}
