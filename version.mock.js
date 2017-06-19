/**
 * @file `version.js` mock for Flow.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

type Version = {
    version: string,
    build: number,
};

export default ({
    version: '0.0.0',
    build: 1,
}: Version);
