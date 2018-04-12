import { Auth0UserProfile } from 'auth0-js';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container, Image, Menu, MenuItemProps } from 'semantic-ui-react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import * as _ from 'underscore';
import Auth from '../util/auth-util';
import { netInfo, NETWORKS } from '../util/net-info';

const StyledMenuItem = ({ style, ...props }: MenuItemProps) => (
  <Menu.Item style={{ ...style, justifyContent: 'center' }} {...props}/>
);

function NavLink({ to, ...props }: any) {
  return (
    <Route path={to} exact>
      {
        ({ match }) => (
          <StyledMenuItem
            {...props}
            active={!!match}
            as={Link}
            to={to}
          />
        )
      }
    </Route>
  );
}

export default function AppHeader({ principal, onLogOut }: { principal: Auth0UserProfile | null, onLogOut: () => void }) {
  return (
    <div>
      <Menu stackable>
        <Container>
          <StyledMenuItem
            as={Link}
            to="/"
            header
            style={{
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
          </StyledMenuItem>

          {
            principal ? [
              <NavLink key="subsciptions" to="/subscriptions">Subscriptions</NavLink>,
              <NavLink key="api-keys" to="/api-keys">API keys</NavLink>
            ] : null
          }
          <NavLink key="docs" to="/docs">Docs</NavLink>

          <Menu.Menu position="right">
            <Dropdown item text="Networks" style={{ justifyContent: 'center' }}>
              <Dropdown.Menu>
                {
                  _.map(
                    NETWORKS,
                    (info, name) => (
                      <Dropdown.Item
                        style={{ textAlign: 'center' }}
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
                    <StyledMenuItem key="img">
                      <Image height={28} circular src={principal.picture}/>
                    </StyledMenuItem>
                  ) : null,
                  principal.name ? (
                    <StyledMenuItem key="name">
                      Logged in as <strong style={{ marginLeft: 4 }}>{principal.name}</strong>
                    </StyledMenuItem>
                  ) : null
                ]
              ) : null
            }

            <StyledMenuItem key="act">
              {
                principal ? (
                  <Button onClick={onLogOut}>Log out</Button>
                ) : (
                  <Button primary onClick={Auth.login}>Log in</Button>
                )
              }
            </StyledMenuItem>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
