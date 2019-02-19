import { AxiosError } from 'axios';

export enum FetchStatus {
    'UNFETCHED' = 'Unfetched',
    'IN_PROGRESS' = 'InProgress',
    'SUCCESS' = 'Success',
    'FAILURE' = 'Failure',
}

export type FetchError = AxiosError;

interface Unfetched {
    status: FetchStatus.UNFETCHED;
}

interface InProgress {
    status: FetchStatus.IN_PROGRESS;
}

interface Success<T> {
    status: FetchStatus.SUCCESS;
    data: T;
}

interface Failure {
    status: FetchStatus.FAILURE;
    error: FetchError;
}

type FetchState<T> = Unfetched | InProgress | Success<T> | Failure;

export default FetchState;
