/**
 * @file TODO: IncrementCounter stub.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import { connect } from 'react-redux';

import Button from '../components/Button';

import { increment } from '../store';

export default connect(null, state => ({ onClick: () => increment() }))(Button);
