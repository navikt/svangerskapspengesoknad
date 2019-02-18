import { Søkerinfo } from 'app/types/Søkerinfo';

export enum ApiActionTypes {
    'GET_SØKERINFO_REQUEST' = 'getSøkerInfoRequest',
    'GET_SØKERINFO_SUCCESS' = 'getSøkerInfoSuccess',
}

export enum SøknadActionTypes {
    'SET_VILKÅR_GODKJENT' = 'setVilkårGodkjent',
    'SET_OPPSUMMERING_GODKJENT' = 'setOppsummeringGodkjent',
}

export interface GetSøkerinfoRequest {
    type: ApiActionTypes.GET_SØKERINFO_REQUEST;
}

export interface GetSøkerinfoSuccess {
    type: ApiActionTypes.GET_SØKERINFO_SUCCESS;
    payload: {
        søkerinfo: Søkerinfo;
    };
}

export interface SetVilkårGodkjent {
    type: SøknadActionTypes.SET_VILKÅR_GODKJENT;
    payload: {
        vilkårErGodkjent: boolean;
    };
}

export interface SetOppsummeringGodkjent {
    type: SøknadActionTypes.SET_OPPSUMMERING_GODKJENT;
    payload: {
        oppsummeringErGodkjent: boolean;
    };
}

export type ApiAction = GetSøkerinfoRequest | GetSøkerinfoSuccess;

export type SøknadAction = SetVilkårGodkjent | SetOppsummeringGodkjent;

type Action = ApiAction | SøknadAction;

export default Action;
