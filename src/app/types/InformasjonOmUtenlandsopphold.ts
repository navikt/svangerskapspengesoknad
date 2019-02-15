import { Tidsperiode } from '.';

export interface Utenlandsopphold {
    land: string;
    tidsperiode: Tidsperiode;
}

interface InformasjonOmUtenlandsopphold {
    jobbetINorgeSiste12Mnd: boolean;
    iNorgePåHendelsestidspunktet: boolean;
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
}

export type InformasjonOmUtenlandsoppholdPartial = Partial<InformasjonOmUtenlandsopphold>;

export default InformasjonOmUtenlandsopphold;
