import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import { Auth0UserProfile } from 'auth0-js';
import Auth from '../util/auth-util';
import { Route } from 'react-router';

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
          <span style={{ position: 'relative', top: 4 }}>Ethercast</span>
        </Menu.Item>
        <NavLink to="/subscriptions">My subscriptions</NavLink>

        <Menu.Menu position="right">
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
