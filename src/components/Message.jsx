/**
 * @file TODO: Message stub.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

import styled from 'styled-components';
import t from 'flow-runtime';

import * as cc from 'const/cc';

import { TError, TWarning, TSuccess, TInfo } from 'types/ui';

const bg = t.pattern(({ level }) =>
    t.pattern(
        (level: TError) => cc.colorErrorNormal,
        (level: TWarning) => cc.colorWarningNormal,
        (level: TSuccess) => cc.colorSuccessNormal,
        (level: TInfo) => cc.colorErrorNormal,
        level => cc.colorInfoNormal,
    )(level),
);

export default styled.div`
    background-color: ${bg};
    padding: ${cc.cellS}px;
    border-radius: ${cc.borderRadius}px;
    margin: ${cc.cellS}px;
`;
