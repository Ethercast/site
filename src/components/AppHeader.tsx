import * as React from 'react';
import { Link } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { Auth0DecodedHash } from 'auth0-js';
import Auth from '../util/auth';

export default function AppHeader({ principal, onLogOut }: { principal: Auth0DecodedHash | null, onLogOut: () => void }) {
  return (
    <Menu fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size="mini" src="/hero.png" style={{ marginRight: '1.5em' }}/>
          if-eth
        </Menu.Item>
        <Menu.Item as={Link} to="/subscriptions">My subscriptions</Menu.Item>

        <Menu.Item position="right">
          {
            principal ? (
              <div>
                <small style={{ marginRight: 8 }}>
                  Logged in as {principal.idTokenPayload.sub}
                </small>
                <Button warning onClick={onLogOut}>Log out</Button>
              </div>
            ) : (
              <Button onClick={Auth.login}>Log in</Button>
            )
          }
        </Menu.Item>
      </Container>
    </Menu>
  );
}
