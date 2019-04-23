import SøknadDTO, { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { UferdigTilrettelegging } from '../types/Tilrettelegging';
import { TilretteleggingDTO } from '../types/TilretteleggingDTO';
import { Søker } from '../types/Søker';
import { mapTilretteleggingerTilDTO } from './tilretteleggingUtils';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => g.id === t.id));

const areDefined = (...items: any[]) => items.some((item) => item !== undefined);

export const processUtfyltSøknad = (
    fødselsnummer: string,
    utfyltSøknad: UferdigSøknad,
    vedlegg: Attachment[]
): SøknadDTO | undefined => {
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

    const tilrettelegging: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(
        fjernForkastetTilrettelegging(utfyltSøknad.tilrettelegging, utfyltSøknad.søknadsgrunnlag),
        fødselsnummer
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
            senereOpphold: utland.senereOpphold
        },
        barn: {
            ...utfyltBarn,
            erBarnetFødt: utfyltBarn.erBarnetFødt === undefined ? false : utfyltBarn.erBarnetFødt,
            termindato: utfyltBarn.termindato,
            fødselsdatoer: barnetsFødselsdato ? [barnetsFødselsdato as Date] : undefined
        },
        vedlegg,
        søker: utfyltSøknad.søker as Søker,
        tilrettelegging
    };
};
