/**
 * @file RocketBroom boilerplate main component.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import styled from 'styled-components';

import govno from '~/govno';

const BlueGovno = styled.div`
    color: #0080ff;
`;

const RedPizda = styled.div`
    color: #ff8000;
`;

export default function App({ pizda }: { pizda(): string }) {
    return (
        <div>
            <BlueGovno>
                {govno()}
            </BlueGovno>
            <RedPizda>
                {pizda()}
            </RedPizda>
        </div>
    );
}
