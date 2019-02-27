import { Tidsperiode } from './Tidsperiode';

export interface Utenlandsopphold {
    land: string;
    periode: Tidsperiode;
}

interface InformasjonOmUtenlandsopphold {
    iNorgePåHendelsestidspunktet: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    jobbetINorgeSiste12Mnd: boolean;

    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export type InformasjonOmUtenlandsoppholdPartial = Partial<InformasjonOmUtenlandsopphold>;

export default InformasjonOmUtenlandsopphold;
