export interface SvangerskapspengerContextState {
    søknad: {
        barn: any;
    };
}

export const svangerskapspengerInitialState: SvangerskapspengerContextState = {
    søknad: {
        barn: 'test',
    },
};
