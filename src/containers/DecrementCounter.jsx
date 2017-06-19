/**
 * @file TODO: DecrementCounter stub.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import { connect } from 'react-redux';

import Button from '../components/Button';

import { decrement } from '../store';

export default connect(null, state => ({ onClick: () => decrement() }))(Button);
