/**
 * @file RocketBroom boilerplate main component.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import styled from 'styled-components';

import govno from '~/govno';

const Div = styled.div`
    color: #ff8000;
`;

function App({ pizda }: { pizda(): string }) {
    return (
        <Div className={'App'}>
            {govno()}
            <br />
            {pizda()}
        </Div>
    );
}

export default App;
