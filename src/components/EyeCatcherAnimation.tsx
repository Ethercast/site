import * as React from 'react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Transition from 'semantic-ui-react/dist/commonjs/modules/Transition/Transition';
import * as _ from 'underscore';

const TEXTS = [
  'A kitty was born',
  'Augur predicted an event',
  'BNTY sold for 0.05 ETH',
  'A MakerDAO CDP was liquidated'
];

function randomText(): string {
  return TEXTS[ Math.round(Math.random() * TEXTS.length - 1) ];
}

interface Catcher {
  text: string;
  position: number;
  right: boolean;
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
          text: randomText(),
          position: Math.round(Math.random() * 100),
          right: Boolean(Math.round(Math.random())),
          fontSize: `${Math.round(100 + Math.random() * 15) / 100}em`
        }
      }
    }));
    setTimeout(
      () => this.setState(({ catchers }) => ({ catchers: _.omit(catchers, '' + id) })),
      4000 + Math.random() * 500
    );
  };

  timer: number;

  componentDidMount() {
    this.timer = window.setInterval(this.addCatcher, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    const { children } = this.props;
    const { catchers } = this.state;

    console.log(catchers);

    return (
      <div style={{ position: 'relative' }}>
        {children}
        <Transition.Group animation={'fade'} duration={200}>
          {
            _.map(
              catchers,
              ({ id, text, fontSize, position, right }) =>
                (
                  <Label
                    icon="exclamation"
                    style={{
                      position: 'absolute',
                      fontSize: fontSize,
                      top: `${position}%`,
                      left: right ? null : 12,
                      right: right ? 12 : null
                    }}>
                    {text}
                  </Label>
                )
            )
          }
        </Transition.Group>
      </div>
    );
  }
}