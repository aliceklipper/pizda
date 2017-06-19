/**
 * @file RocketBroom boilerplate main component.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import govno from '~/govno';

import Message from './Message';

import CounterDisplay from '../containers/CounterDisplay';
import IncrementCounter from '../containers/IncrementCounter';
import DecrementCounter from '../containers/DecrementCounter';

export default function App({ pizda }: { pizda(): string }) {
    return (
        <div>
            <Message>
                {govno()}
                <DecrementCounter>-</DecrementCounter>
                <CounterDisplay />
                <IncrementCounter>+</IncrementCounter>
                {' times.'}
            </Message>
            <Message level="success">
                {pizda()}
            </Message>
            <Message level="warning">
                {pizda()}
            </Message>
            <Message level="error">
                {pizda()}
            </Message>
        </div>
    );
}
