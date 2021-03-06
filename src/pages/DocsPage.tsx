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

const ModelLink = ({ schemaKeys }: { schemaKeys: string[] }) => {
  return (
    <span>
      {
        schemaKeys.map(
          (schemaKey, ix) => (
            <span>
            <a key={schemaKey}
               href={`https://docs.ethercast.io/model/interfaces/${schemaKey.toLowerCase()}.html`}>
              {schemaKey}
            </a>{
              ix === schemaKeys.length - 1 ? '' : ' | '
            }
            </span>
          )
        )
      }
    </span>
  );
};

const APIRouteRow = ({ name, verb, path, schemaKeys }: { name: string, verb: HTTP, path: string, schemaKeys?: string[] }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <strong>{name}</strong>
      </Table.Cell>
      <Table.Cell>
        <code>{verb}</code>
      </Table.Cell>
      <Table.Cell>
        <code>{path}</code>
      </Table.Cell>
      <Table.Cell>
        {schemaKeys ? <ModelLink schemaKeys={schemaKeys}/> : null}
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
      <Header as='h3'>API Endpoints</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Operation
            </Table.HeaderCell>
            <Table.HeaderCell>
              HTTP Method
            </Table.HeaderCell>
            <Table.HeaderCell>
              Path
            </Table.HeaderCell>
            <Table.HeaderCell>
              Request Body
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <APIRouteRow name="List API Keys" verb={HTTP.GET} path="api-keys"/>
          <APIRouteRow name="Create API Key" verb={HTTP.POST} path="api-keys" schemaKeys={['CreateApiKeyRequest']}/>
          <APIRouteRow name="Get API Key by ID" verb={HTTP.DELETE} path="api-keys/{id}"/>
          <APIRouteRow name="List Subscriptions" verb={HTTP.GET} path="subscriptions"/>
          <APIRouteRow name="Create Subscription" verb={HTTP.POST} path="subscriptions"
                       schemaKeys={['CreateTransactionSubscriptionRequest', 'CreateLogSubscriptionRequest']}/>
          <APIRouteRow name="Get Subscription by ID" verb={HTTP.GET} path="subscriptions/{id}"/>
          <APIRouteRow name="Deactivate Subscription" verb={HTTP.DELETE} path="subscriptions/{id}"/>
          <APIRouteRow name="List Subscription Receipts" verb={HTTP.GET} path="subscriptions/{id}/receipts"/>
          <APIRouteRow name="Get Example Webhook" verb={HTTP.POST} path="get-examples"
                       schemaKeys={['GetExampleTransactionRequest', 'GetExampleLogRequest']}/>
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
              <a href="https://unpkg.com/@ethercast/model@latest/build/ethercast-api-types-schema.json">
                Ethercast JSON Schema
              </a>
            </Table.Cell>
            <Table.Cell>
              This JSON schema describes the models used by the API
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <a href="https://unpkg.com/@ethercast/model@latest/build/ethereum-types-schema.json">
                Ethereum JSON Schema
              </a>
            </Table.Cell>
            <Table.Cell>
              This JSON schema describes the models delivered to your Webhook
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
