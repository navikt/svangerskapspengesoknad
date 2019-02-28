import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';

const validerIntro = (søknad: UferdigSøknad): Søknadfeil => {
    let errors: any = {};

    if (søknad.harGodkjentVilkår === false) {
        errors.harGodkjentVilkår = 'Du må godkjenne vilkårene for å kunne fortsette med søknaden.';
    }

    return errors;
};

export default validerIntro;
