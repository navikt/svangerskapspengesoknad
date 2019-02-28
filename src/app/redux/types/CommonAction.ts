import { Språkkode } from 'common/types';
import Steg from 'app/types/Steg';

export enum CommonActionTypes {
    'SET_SPRÅK' = 'setSpråk',
    'SET_STEG' = 'setSteg',
}

interface SetSpråk {
    type: CommonActionTypes.SET_SPRÅK;
    payload: {
        språkkode: Språkkode;
    };
}

interface SetSteg {
    type: CommonActionTypes.SET_STEG;
    payload: {
        steg: Steg;
    };
}

type CommonAction = SetSpråk | SetSteg;

export default CommonAction;
