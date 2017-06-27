/**
 * @file RocketBroom boilerplate entry point.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import version from 'version';

import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import store from './store';

import * as cc from 'const/cc';
import App from 'components/App';

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
