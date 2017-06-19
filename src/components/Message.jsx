/**
 * @file TODO: Message stub.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import * as cc from 'cc';

import styled from 'styled-components';
import t from 'flow-runtime';

import { TError, TWarning, TSuccess, TInfo } from 'types/ui';

const bg = t.pattern(props =>
    t.pattern(
        (level: TError) => cc.colorErrorNormal,
        (level: TWarning) => cc.colorWarningNormal,
        (level: TSuccess) => cc.colorSuccessNormal,
        (level: TInfo) => cc.colorErrorNormal,
        level => cc.colorInfoNormal,
    )(props.level),
);

export default styled.div`
    background-color: ${bg};
    padding: ${cc.cellS}px;
    border-radius: ${cc.borderRadius}px;
    margin: ${cc.cellS}px;
`;
