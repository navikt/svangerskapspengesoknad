import { Tidsperiode } from './Tidsperiode';

export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

export enum Oppholdstype {
    'TIDLIGERE_OPPHOLD' = 'tidligereOpphold',
    'SENERE_OPPHOLD' = 'senereOpphold',
}

interface InformasjonOmUtenlandsopphold {
    iNorgePåHendelsestidspunktet: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    jobbetINorgeSiste12Mnd: boolean;

    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export interface InformasjonOmUtenlandsoppholdPartial {
    iNorgePåHendelsestidspunktet?: boolean;
    iNorgeSiste12Mnd?: boolean;
    iNorgeNeste12Mnd?: boolean;
    jobbetINorgeSiste12Mnd?: boolean;

    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export default InformasjonOmUtenlandsopphold;
