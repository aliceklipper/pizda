/**
 * @file RocketBroom boilerplate entry point.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import ReactDOM from 'react-dom';

import { injectGlobal } from 'styled-components';

import App from './components/App';

(async () => {
    injectGlobal`
        html,
        body {
            padding: 0;
            margin: 0;
            font-family: 'PT Sans', sans-serif;
            line-height: 20px;
            font-size: 13px;
        }
    `;

    ReactDOM.render(<App pizda={() => 'The Pizda.'} />, document.querySelector('#mount'));
})();
