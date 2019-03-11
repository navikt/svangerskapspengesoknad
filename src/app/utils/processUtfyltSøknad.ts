import Søknad, { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { UferdigTilrettelegging } from 'app/types/Tilrettelegging';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => g.id === t.id));

const removeId = (t: UferdigTilrettelegging) => {
    const { id, ...other } = t;
    return other;
};

const processUtfyltSøknad = (utfyltSøknad: UferdigSøknad): Søknad | undefined => {
    const { informasjonOmUtenlandsopphold: utland } = utfyltSøknad;

    const tilrettelegging = fjernForkastetTilrettelegging(
        utfyltSøknad.tilrettelegging,
        utfyltSøknad.søknadsgrunnlag
    ).map(removeId);

    return {
        type: Søknadstype.SVANGERSKAPSPENGER,
        erEndringssøknad: false,
        informasjonOmUtenlandsopphold: {
            iNorgePåHendelsestidspunktet: !!utland.iNorgePåHendelsestidspunktet,
            iNorgeSiste12Mnd: !!utland.iNorgeSiste12Mnd,
            iNorgeNeste12Mnd: !!utland.iNorgeNeste12Mnd,
            jobbetINorgeSiste12Mnd: !!utland.jobbetINorgeSiste12Mnd,
            tidligereOpphold: utland.tidligereOpphold,
            senereOpphold: utland.senereOpphold,
        },
        barn: utfyltSøknad.barn,
        vedlegg: utfyltSøknad.vedlegg,
        søker: utfyltSøknad.søker,
        tilrettelegging,
    };
};

export default processUtfyltSøknad;
