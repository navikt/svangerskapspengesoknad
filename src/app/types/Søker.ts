import { FrilansInformasjonPartial } from './FrilansInformasjon';
import { Næring } from './SelvstendigNæringsdrivende';
import { AnnenInntekt } from './AnnenInntekt';
import { Språkkode } from 'common/types';

export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilansSiste10Mnd: boolean;
    frilansInformasjon?: FrilansInformasjonPartial;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    selvstendigNæringsdrivendeInformasjon?: Næring[];
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: AnnenInntekt[];
    språkkode: Språkkode;
}

export default Søker;
