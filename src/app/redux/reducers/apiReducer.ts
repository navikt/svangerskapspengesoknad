import { Søkerinfo } from 'app/types/Søkerinfo';
import { ApiAction, ApiActionTypes } from '../types/Action';

export interface ApiState {
    søkerinfo?: Søkerinfo;
    isLoadingSøkerinfo: boolean;
}

const getDefaultState = (): ApiState => ({
    isLoadingSøkerinfo: false,
});

const apiReducer = (state = getDefaultState(), action: ApiAction): ApiState => {
    switch (action.type) {
        case ApiActionTypes.GET_SØKERINFO_REQUEST:
            return {
                ...state,
                isLoadingSøkerinfo: true,
            };

        case ApiActionTypes.GET_SØKERINFO_SUCCESS:
            return {
                ...state,
                søkerinfo: action.payload.søkerinfo,
                isLoadingSøkerinfo: false,
            };

        default: {
            return state;
        }
    }
};

export default apiReducer;
