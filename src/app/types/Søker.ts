import { FrilansInformasjonPartial } from './FrilansInformasjon';
import { Næring } from './SelvstendigNæringsdrivende';
import { AnnenInntekt } from './AnnenInntekt';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilansSiste10Mnd: boolean;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    erAleneOmOmsorg: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: Array<AnnenInntekt>;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    frilansInformasjon?: FrilansInformasjonPartial;
}

export default Søker;
