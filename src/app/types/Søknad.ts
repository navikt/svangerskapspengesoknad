import Arbeidsforhold from './Arbeidsforhold';
import Barn from './Barn';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import Tilrettelegging from './Tilrettelegging';

interface Søknad {
    saksnummer: string;
    barn: Barn;
    harGodkjentVilkår: boolean;
    harGodkjentOppsummering: boolean;
    arbeidsforhold: Arbeidsforhold;
    førsteUtbetalingsdag: Date;
    tilrettelegging: Tilrettelegging;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;

    // selvstendigNæringsdrivendeInformasjon?: Næring[];
    // frilansInformasjon?: FrilansInformasjon;
}

export default Søknad;
