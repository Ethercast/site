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
        <Menu.Item as={Link} to="/" header>
          Ethercast <Image size="mini" src="/hero.png" style={{ marginRight: '1.5em' }}/>
        </Menu.Item>
        <NavLink to="/subscriptions">My subscriptions</NavLink>

        <Menu.Menu position="right">
          {
            principal ? (
              <Menu.Item>
                Logged in as <strong style={{ marginLeft: 4 }}>{principal.name}</strong>
              </Menu.Item>
            ) : null
          }

          <Menu.Item>
            {
              principal ? (
                <Button onClick={onLogOut}>Log out</Button>
              ) : (
                <Button onClick={Auth.login}>Log in</Button>
              )
            }
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
