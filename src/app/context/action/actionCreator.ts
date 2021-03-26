import { VelkommenFormData } from 'app/pages/velkommenFormConfig';

export enum SvangerskapspengerContextActionKeys {
    'SET_VELKOMMEN' = 'setVelkommen',
}

interface SetVelkommen {
    type: SvangerskapspengerContextActionKeys.SET_VELKOMMEN;
    payload: VelkommenFormData;
}

const setVelkommen = (payload: VelkommenFormData): SetVelkommen => ({
    type: SvangerskapspengerContextActionKeys.SET_VELKOMMEN,
    payload,
});

export type SvangerskapspengerContextAction = SetVelkommen;

export default {
    setVelkommen,
};
