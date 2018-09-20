import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Divider, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

enum HTTP {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

const ModelLink = ({ schemaKey }: { schemaKey: string }) => {
  const href = `https://docs.ethercast.io/model/interfaces/${schemaKey.toLowerCase()}.html`;

  return (
    <a href={href}>{schemaKey}</a>
  );
};

const APIRouteRow = ({ verb, path, schemaKey }: { verb: HTTP, path: string, schemaKey?: string }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <code><b>{verb}</b></code>
      </Table.Cell>
      <Table.Cell>
        <code>{path}</code>
      </Table.Cell>
      <Table.Cell>
        {schemaKey ? <ModelLink schemaKey={schemaKey}/> : null}
      </Table.Cell>
    </Table.Row>
  );
};

export default function Docs(props: RouteComponentProps<{}>) {
  return (
    <Container>
      <Header as='h2'>Introduction</Header>
      <p>
        Ethercast allows you to set up subscriptions to events or transactions on the Ethereum Blockchain.
        <br/>
        Subscriptions can be set up through the website, or via the API using an API Key and API Secret pair obtained
        from the Ethercast.io website.
        This documentation covers how to interact with webhooks once you receive them, and how to subscribe to
        them through the API.
      </p>
      <p>
        Documentation is generated from TypeScript sources to help you validate and consume Webhooks and the API.
        Click on the definitions or source buttons in any section to see them.
      </p>
      <Divider/>
      <Header as='h3'>Receiving Webhooks</Header>
      <Header as='h4'>Webhook Request Format</Header>
      <p>
        Once you've created a subscription, you'll need to handle the incoming requests, i.e. webhooks.
        Depending on the type of event you've subscribed to, you will either receive the <a
        href='https://docs.ethercast.io/model/interfaces/decodedlog.html'>DecodedLog</a> or <a
        href='https://docs.ethercast.io/model/interfaces/decodedtransaction.html'>DecodedTransaction</a> interface.
      </p>
      <p>
        The <code>ethercast</code> property of either will contain the decoded data in the event or transaction.
        If the log or transaction could not be decoded by Ethercast, you will receive the
        regular variant, without the <code>ethercast</code> key.
      </p>
      <Header as='h4'>Validating Webhook Requests</Header>
      <p>
        Webhook payloads are signed with a secret unique to each subscription. The signature can be found in the request
        header, <code>X-Ethercast-Signatures</code>.
        You can validate a payload signature using a TypeScript module we provide <a
        href='https://docs.ethercast.io/calculate-signature/globals.html#isvalidsignature'>isValidSignature
      </a> function.
      </p>
      <p>
        Validating requests is a good idea to make sure the payload has not been tampered and the webhook
        originated from Ethercast, especially if your webhook is an insecure HTTP endpoint.
      </p>
      <Divider/>
      <Header as='h3'>API Keys</Header>
      <p>
        You can do anything that can be done using the website through an API as well, using an API key.
        If you don't yet have an API key, you can <Link to="/api-keys/new">create one here</Link>.
        API keys and especially their secrets should not be shared -
        these are most appropriate for server-to-server commumnication.
        Their permission scopes may also be restricted to avoid accidental misuse.
      </p>
      <p>
        Requests sent to the API must include an Authorization header with the api key and secret:
        <br/>
        <code>Authorization: api-key API_KEY:API_SECRET</code>
      </p>
      <p>
        Make sure to send your request to the correct API.
        API keys will only work on the network for which they were generated.
        <br/>
        The mainnet API is served over <code>https://api.ethercast.io</code>.
        Test nets (as they become available) are served over <code>
        https://{'{'}network-name{'}'}.api.ethercast.io</code>.
      </p>
      <Header as='h4'>Available Routes</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <code><b>VERB</b></code>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <code>path</code>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Expected body
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <APIRouteRow verb={HTTP.POST} path="api-keys" schemaKey="CreateApiKeyRequest"/>
          <APIRouteRow verb={HTTP.GET} path="api-keys"/>
          <APIRouteRow verb={HTTP.DELETE} path="api-keys/{id}"/>
          <APIRouteRow verb={HTTP.POST} path="subscriptions" schemaKey="CreateSubscriptionRequest"/>
          <APIRouteRow verb={HTTP.GET} path="subscriptions"/>
          <APIRouteRow verb={HTTP.GET} path="subscriptions/{id}"/>
          <APIRouteRow verb={HTTP.GET} path="subscriptions/{id}/receipts"/>
          <APIRouteRow verb={HTTP.DELETE} path="subscriptions/{id}"/>
          <APIRouteRow verb={HTTP.POST} path="get-examples" schemaKey="GetExampleRequest"/>
        </Table.Body>
      </Table>

      <Header as="h3">Reference Links</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Link
            </Table.HeaderCell>
            <Table.HeaderCell>
              Description
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <a href="https://github.com/ethercast/">GitHub Organization</a>
            </Table.Cell>
            <Table.Cell>All the code is open source. Please feel free to contribute to improve the Ethercast
              service. If you ever have any questions about how something in Ethercast works, you can
              reference the source code.</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a href="https://github.com/Ethercast/model">Ethercast Model Repo</a>
            </Table.Cell>
            <Table.Cell>
              The model contains descriptions of the types that are used by both the Ethercast API and
              your recipient webhooks.
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a href="mailto:hello@ethercast.io">E-mail us!</a>
            </Table.Cell>
            <Table.Cell>
              If you ever have any questions, we're just a quick e-mail away.
              We will try to get back to you as soon as possible!
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}
