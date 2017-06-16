/**
 * @file RocketBroom boilerplate entry point.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import ReactDOM from 'react-dom';

import App from './components/App';

(async () => {
    ReactDOM.render(<App pizda={() => 'The Zhopa.'} />, document.querySelector('#mount'));
})();
