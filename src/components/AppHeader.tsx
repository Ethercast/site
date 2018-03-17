import { Auth0UserProfile } from 'auth0-js';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import * as _ from 'underscore';
import Auth from '../util/auth-util';
import { netInfo, NETWORKS } from '../util/net-info';

function NavLink({ to, ...props }: any) {
  return (
    <Route path={to} exact>
      {
        ({ match }) => <Menu.Item {...props} active={!!match} as={Link} to={to}/>
      }
    </Route>
  );
}

export default function AppHeader({ principal, onLogOut }: { principal: Auth0UserProfile | null, onLogOut: () => void }) {
  return (
    <Menu stackable>
      <Container>
        <Menu.Item as={Link} to="/" header style={{
          display: 'inline-block',
          fontFamily: 'Roboto Slab',
          fontSize: '1.2em',
          padding: '0.5em 1em',
          textAlign: 'center'
        }}>
          <Image
            size="mini"
            src="/hero.png"
            style={{
              display: 'inline-block',
              margin: '0 0.5em 0 -0.5em',
              verticalAlign: 'middle'
            }}
          />
          <span style={{ position: 'relative', top: 4 }}>
            Ethercast
          </span>
        </Menu.Item>
        {
          principal ? [
            <NavLink key="sub-link" to="/subscriptions">My subscriptions</NavLink>
            // <NavLink key="api-keys-link" to="/api-keys">My API keys</NavLink>
          ] : null
        }

        <Menu.Menu position="right">
          <Dropdown item text="Networks">
            <Dropdown.Menu>
              {
                _.map(
                  NETWORKS,
                  (info, name) => (
                    <Dropdown.Item
                      key={name}
                      as="a"
                      text={name}
                      disabled={!info.enabled}
                      active={info === netInfo}
                      href={`https://${name.toLowerCase()}.ethercast.io`}
                    />
                  )
                )
              }
            </Dropdown.Menu>
          </Dropdown>

          {
            principal ? (
              [
                principal.picture ? (
                  <Menu.Item key="img">
                    <Image height={28} circular src={principal.picture}/>
                  </Menu.Item>
                ) : null,
                principal.name ? (
                  <Menu.Item key="name">
                    Logged in as <strong style={{ marginLeft: 4 }}>{principal.name}</strong>
                  </Menu.Item>
                ) : null
              ]
            ) : null
          }

          <Menu.Item key="act">
            {
              principal ? (
                <Button onClick={onLogOut}>Log out</Button>
              ) : (
                <Button primary onClick={Auth.login}>Log in</Button>
              )
            }
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
