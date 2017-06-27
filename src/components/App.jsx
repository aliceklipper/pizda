/**
 * @file RocketBroom boilerplate main component.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import t from 'flow-runtime';

import Message from 'components/Message';

const fib = t.pattern(
    (x: 0) => 0,
    (x: 1) => 1,
    (x: number) => fib(x - 1) + fib(x - 2), // eslint-disable-line no-magic-numbers
);

export default function App() {
    return (
        <div>
            <Message level="error">
                Ti pidor.
            </Message>
        </div>
    );
}
