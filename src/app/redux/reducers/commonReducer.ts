import { Språkkode } from 'common/intl/types';
import { CommonActionTypes } from '../types/CommonAction';
import CommonAction from '../types/CommonAction';
import Steg from 'app/types/Steg';

export const getDefaultCommonState = (): CommonState => ({
    språkkode: 'nb',
    steg: Steg.FØRSTE_STEG,
});

export interface CommonState {
    språkkode: Språkkode;
    steg: Steg;
}

const commonReducer = (state = getDefaultCommonState(), action: CommonAction): CommonState => {
    switch (action.type) {
        case CommonActionTypes.SET_SPRÅK:
            return {
                ...state,
                språkkode: action.payload.språkkode,
            };

        case CommonActionTypes.SET_STEG:
            return {
                ...state,
                steg: action.payload.steg,
            };
    }
    return state;
};

export default commonReducer;
