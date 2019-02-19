import FetchState, { FetchStatus } from 'app/types/FetchState';

export const getData = <T>(fetchState: FetchState<T>, defaultValue: any): T => {
    return fetchState && fetchState.status === FetchStatus.SUCCESS ? fetchState.data : defaultValue;
};

export const getErrorCode = <T>(fetchState: FetchState<T>): number => {
    return fetchState && fetchState.status === FetchStatus.FAILURE && fetchState.error.response
        ? fetchState.error.response.status
        : 0;
};
