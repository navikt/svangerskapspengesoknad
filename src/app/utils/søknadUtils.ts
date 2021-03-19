import SøknadDTO, { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { UferdigTilrettelegging } from '../types/Tilrettelegging';
import { TilretteleggingDTO } from '../types/TilretteleggingDTO';
import { Søker } from '../types/Søker';
import { mapTilretteleggingerTilDTO } from './tilretteleggingUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Språkkode } from 'common/types';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => g.id === t.id));

const areDefined = (...items: any[]) => items.some((item) => item !== undefined);

const korrigerTilretteleggingArbeidsforhold = (
    tilrettelegging: UferdigTilrettelegging,
    arbeidsforhold: Arbeidsforhold[]
): UferdigTilrettelegging => {
    const forhold = tilrettelegging.arbeidsforhold.id
        ? arbeidsforhold.find((a) => a.guid === tilrettelegging.arbeidsforhold.id)
        : undefined;
    if (forhold) {
        return {
            ...tilrettelegging,
            arbeidsforhold: {
                ...tilrettelegging.arbeidsforhold,
                id: forhold.arbeidsgiverId,
            },
        };
    }
    return tilrettelegging;
};

const convertSpråkkode = (språkkode: Språkkode) => {
    if (språkkode === 'nn') {
        return 'NN';
    } else {
        return 'NB';
    }
};

export const processUtfyltSøknad = (
    utfyltSøknad: UferdigSøknad,
    vedlegg: Attachment[],
    arbeidsforhold: Arbeidsforhold[],
    språkkode: Språkkode
): SøknadDTO | undefined => {
    const { informasjonOmUtenlandsopphold: utland } = utfyltSøknad;
    const { fødselsdato: barnetsFødselsdato, ...utfyltBarn } = utfyltSøknad.barn;

    if (!areDefined(utfyltBarn.erBarnetFødt, utfyltBarn.termindato)) {
        return undefined;
    }

    if (!utfyltBarn.termindato) {
        return undefined;
    }

    const tilrettelegging: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(
        fjernForkastetTilrettelegging(utfyltSøknad.tilrettelegging, utfyltSøknad.søknadsgrunnlag).map((t) => {
            return korrigerTilretteleggingArbeidsforhold(t, arbeidsforhold);
        })
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
        barn: {
            ...utfyltBarn,
            erBarnetFødt: utfyltBarn.erBarnetFødt === undefined ? false : utfyltBarn.erBarnetFødt,
            termindato: utfyltBarn.termindato,
            fødselsdatoer: barnetsFødselsdato ? [barnetsFødselsdato] : undefined,
        },
        vedlegg,
        søker: {
            ...(utfyltSøknad.søker as Søker),
            språkkode: convertSpråkkode(språkkode),
        },
        tilrettelegging: tilrettelegging.map((t) => ({
            ...t,
            vedlegg: t.vedlegg.filter((vedleggId) => vedlegg.find((v) => v.id === vedleggId)),
        })),
    };
};
