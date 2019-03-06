import Søknad, { Søknadstype, UferdigSøknad } from 'app/types/Søknad';
import Tilrettelegging from 'app/types/Tilrettelegging';

const fjernForkastetTilrettelegging = (tilrettelegging: Tilrettelegging[], tilretteleggingsgrunnlag: string[]) =>
    tilrettelegging.filter(({ arbeidsgiverId }) => tilretteleggingsgrunnlag.includes(arbeidsgiverId));

const processUtfyltSøknad = (utfyltSøknad: UferdigSøknad): Søknad | undefined => {
    const { informasjonOmUtenlandsopphold: utland } = utfyltSøknad;

    const tilrettelegging = fjernForkastetTilrettelegging(
        utfyltSøknad.tilrettelegging,
        utfyltSøknad.tilretteleggingsgrunnlag
    );

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
        tilrettelegging,
    };
};

export default processUtfyltSøknad;
