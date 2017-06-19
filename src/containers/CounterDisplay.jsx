/**
 * @file TODO: CounterDisplay stub.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import { connect } from 'react-redux';

import Label from '../components/Label';

export default connect(state => ({ children: state.counter }))(Label);
