export enum Søkerrolle {
    'MOR' = 'mor',
}

export interface Søker {
    rolle: Søkerrolle.MOR;
    harJobbetSomFrilansSiste10Mnd: boolean;
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    erAleneOmOmsorg: boolean;
    harHattAnnenInntektSiste10Mnd: boolean;
    andreInntekterSiste10Mnd?: Array<any>;

    selvstendigNæringsdrivendeInformasjon?: Array<any>;
    // selvstendigNæringsdrivendeInformasjon?:  Næring[];
    // frilansInformasjon?:  Frilansinform;
}

export default Søker;
