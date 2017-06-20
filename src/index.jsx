/**
 * @file RocketBroom boilerplate entry point.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import version from 'version';
import * as cc from 'cc';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';

import App from './components/App';

import store from './store';

(async () => {
    injectGlobal`
        html,
        body {
            padding: 0;
            margin: 0;

            line-height: ${cc.lineHeight}px;

            font-family: ${cc.fontFamily};
            font-size: ${cc.fontSize}px;

            background-color: #31363b;
            color: ${cc.textColor};
        }

        * {
            box-sizing: border-box;
        }
    `;

    render(
        <Provider store={store}>
            <App pizda={() => `The Pizda v${version.version}+${version.build}.`} />
        </Provider>,
        document.querySelector('#mount'),
    );
})();
