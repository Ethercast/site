import * as React from 'react';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Transition from 'semantic-ui-react/dist/commonjs/modules/Transition/Transition';
import * as _ from 'underscore';

const TEXTS = [
  'CryptoKitties: a new kitty was born',
  'MakerDAO: a CDP was opened',
  'Augur: a bet was completed',
  'EtherDelta: a trade was executed',
  'MakerDAO: a CDP was liquidated',
  '0x00: sent you some ETH',
  'CryptoKitties: the genesis kitty sold'
];

const FREQUENCY: number = 3000;
const DURATION: number = 5000;

interface Catcher {
  text: string;
  position: number;
  right: boolean;
  visible: boolean;
}

export default class EyeCatcherAnimation extends React.Component<{}, { catchers: { [id: number]: Catcher } }> {
  state = {
    catchers: {}
  };

  nextId: number = 0;

  addCatcher = () => {
    const id = this.nextId++;

    this.setState(({ catchers }) => ({
      catchers: {
        ...catchers,
        [ id ]: {
          text: TEXTS[ id % TEXTS.length ],
          visible: true,
          position: Math.round(Math.random() * 90 + 5),
          right: id % 2 === 1,
          fontSize: `${Math.round(100 + Math.random() * 15) / 100}em`
        }
      }
    }));

    setTimeout(
      () => {
        this.setState(
          ({ catchers }) => ({
            catchers: {
              ...catchers,
              [ id ]: {
                ...catchers[ id ],
                visible: false
              }
            }
          })
        );

        setTimeout(
          () => {
            this.setState(({ catchers }) => ({ catchers: _.omit(catchers, '' + id) }));
          },
          500
        );
      },
      DURATION
    );
  };

  timer: number;

  componentDidMount() {
    this.timer = window.setInterval(this.addCatcher, FREQUENCY);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    const { children } = this.props;
    const { catchers } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        {children}
        <Responsive minWidth={1200}>
          {
            _.map(
              catchers,
              ({ visible, text, fontSize, position, right }, id) =>
                (
                  <Transition
                    key={id}
                    transitionOnMount
                    animation={right ? 'fade left' : 'fade right'}
                    visible={visible}
                  >
                  <span
                    style={{
                      margin: '0',
                      color: 'rgba(255,255,255,0.8)',
                      position: 'absolute',
                      fontSize: fontSize,
                      top: `${position}%`,
                      left: right ? null : 12,
                      right: right ? 12 : null
                    }}
                  >
                    {right ? <Icon name="exclamation"/> : null}
                    {text}
                    {right ? null : <Icon name="exclamation"/>}
                  </span>
                  </Transition>
                )
            )
          }
        </Responsive>
      </div>
    );
  }
}