import Søknad, { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { UferdigTilrettelegging } from 'app/types/Tilrettelegging';
import { Attachment } from 'common/storage/attachment/types/Attachment';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => g.id === t.id));

const removeId = (t: UferdigTilrettelegging) => {
    const { id, ...other } = t;
    return other;
};

const areDefined = (...items: any[]) => items.some((item) => item !== undefined);

const processUtfyltSøknad = (utfyltSøknad: UferdigSøknad, vedlegg: Attachment[]): Søknad | undefined => {
    const { informasjonOmUtenlandsopphold: utland } = utfyltSøknad;
    const { fødselsdato: barnetsFødselsdato, ...utfyltBarn } = utfyltSøknad.barn;

    if (!areDefined(utfyltBarn.erBarnetFødt, utfyltBarn.termindato)) {
        return undefined;
    }

    if (utfyltBarn.erBarnetFødt && !utfyltSøknad.barn.fødselsdato) {
        return undefined;
    }

    if (!utfyltBarn.termindato) {
        return undefined;
    }

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
        barn: {
            ...utfyltBarn,
            erBarnetFødt: utfyltBarn.erBarnetFødt === undefined ? false : utfyltBarn.erBarnetFødt,
            termindato: utfyltBarn.termindato,
            fødselsdatoer: barnetsFødselsdato ? [barnetsFødselsdato as Date] : undefined,
        },
        vedlegg,
        søker: utfyltSøknad.søker,
        tilrettelegging,
    };
};

export default processUtfyltSøknad;
