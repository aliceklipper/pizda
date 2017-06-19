/**
 * @file CSS constants.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

/*
 eslint
 no-magic-numbers: off,
 */

import hsl from '@klippersubs/hsluv';

// <editor-fold desc="Common constants">

/**
 * Basic grid cell size.
 * @type {number}
 */
export const cell = 20;

/**
 * Small cell.
 * @type {number}
 */
export const cellS = cell * 0.5;

/**
 * Extra-small cell.
 * @type {number}
 */
export const cellXs = cell * 0.25;

/**
 * Really small cell.
 * @type {number}
 */
export const cellXxs = cell * 0.2;

/**
 * Actually not a cell.
 * @type {number}
 */
export const cellXxxs = cell * 0.15;

/**
 * Large cell.
 * @type {number}
 */
export const cellL = cell * 1.5;

/**
 * Extra-large cell.
 * @type {number}
 */
export const cellXl = cell * 2;

/**
 * Really large cell.
 * @type {number}
 */
export const cellXxl = cell * 3;

/**
 * Awfully large cell.
 * @type {number}
 */
export const cellXxxl = cell * 4;

// </editor-fold>

// <editor-fold desc="Box-related constants">

export const borderRadius = cellXxxs;

// </editor-fold>

// <editor-fold desc="Font-related constants">

/**
 * Basic line height.
 * @type {number}
 */
export const lineHeight = cell;

// TODO: Add line height constants for headers and small text.

/**
 * Basic font family.
 * @type {string}
 */
export const fontFamily = `'PT Sans', 'Ubuntu', 'Roboto', 'Helvetica', 'Verdana', sans-serif`;

/**
 * Font size factor, used to convert line height to font size.
 * @type {number}
 */
export const fontSizeFactor = 0.65;

/**
 * Basic font size.
 * @type {number}
 */
export const fontSize = lineHeight * fontSizeFactor;

// TODO: Add font size constants for headers and small text.

// </editor-fold>

// <editor-fold desc="Color-related constants">

export const saturationNormal = 100;
export const lightnessNormal = 50;

export const textColor = '#fff';

// <editor-fold desc="Message types">

export const hueError = 10;
export const colorErrorNormal = hsl(hueError, saturationNormal, lightnessNormal);

export const hueWarning = 50;
export const colorWarningNormal = hsl(hueWarning, saturationNormal, lightnessNormal);

export const hueSuccess = 140;
export const colorSuccessNormal = hsl(hueSuccess, saturationNormal, lightnessNormal);

export const hueInfo = 240;
export const colorInfoNormal = hsl(hueInfo, saturationNormal, lightnessNormal);

// </editor-fold>

// </editor-fold>
