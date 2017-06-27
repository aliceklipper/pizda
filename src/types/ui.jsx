export type TError = 'error';
export type TWarning = 'warning';
export type TSuccess = 'success';
export type TInfo = 'info';

export type TMessageLevel = {
    level: TError | TWarning | TSuccess | TInfo,
};
