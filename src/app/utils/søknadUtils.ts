import SøknadDTO, { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import {
    UferdigTilrettelegging,
    Tilrettelegging,
    Tilretteleggingstype,
    Arbeidsforholdstype
} from '../types/Tilrettelegging';
import {
    TilretteleggingDTO,
    HelTilretteleggingDTO,
    DelvisTilretteleggingDTO,
    IngenTilretteleggingDTO,
    ArbeidsforholdDTO
} from '../types/TilretteleggingDTO';
import { Søker } from '../types/Søker';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => g.id === t.id));

const areDefined = (...items: any[]) => items.some((item) => item !== undefined);

const mapHelTilrettelegging = (
    tilrettelegging: Tilrettelegging,
    arbeidsforhold: ArbeidsforholdDTO
): HelTilretteleggingDTO | undefined => {
    if (!tilrettelegging.helTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.HEL,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        tilrettelagtArbeidFom: tilrettelegging.helTilrettelegging!.tilrettelagtArbeidFom
    };
};

const mapDelvisTilrettelegging = (
    tilrettelegging: Tilrettelegging,
    arbeidsforhold: ArbeidsforholdDTO
): DelvisTilretteleggingDTO | undefined => {
    if (!tilrettelegging.delvisTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.DELVIS,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        tilrettelagtArbeidFom: tilrettelegging.delvisTilrettelegging!.tilrettelagtArbeidFom,
        stillingsprosent: tilrettelegging.delvisTilrettelegging!.stillingsprosent
    };
};
const mapIngenTilrettelegging = (
    tilrettelegging: Tilrettelegging,
    arbeidsforhold: ArbeidsforholdDTO
): IngenTilretteleggingDTO | undefined => {
    if (!tilrettelegging.ingenTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.INGEN,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        slutteArbeidFom: tilrettelegging.ingenTilrettelegging.slutteArbeidFom
    };
};

const mapArbeidsforholdForTilrettelegging = (
    tilrettelegging: UferdigTilrettelegging,
    fnr: string
): ArbeidsforholdDTO => {
    const { arbeidsforhold } = tilrettelegging;
    switch (arbeidsforhold.type) {
        case Arbeidsforholdstype.FRILANSER:
            return {
                type: Arbeidsforholdstype.FRILANSER,
                risikoFaktorer: tilrettelegging.risikoFaktorer,
                tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak
            };
        case Arbeidsforholdstype.SELVSTENDIG:
            return {
                type: Arbeidsforholdstype.SELVSTENDIG,
                fnr,
                risikoFaktorer: tilrettelegging.risikoFaktorer,
                tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak
            };
        case Arbeidsforholdstype.ANDRE_INNTEKTER:
            return {
                type: Arbeidsforholdstype.ANDRE_INNTEKTER,
                fnr
            };
        case Arbeidsforholdstype.VIRKSOMHET:
            return {
                type: Arbeidsforholdstype.VIRKSOMHET,
                orgnr: tilrettelegging.id
            };
    }
};
export const mapTilretteleggingerTilDTO = (
    tilrettelegging: UferdigTilrettelegging[],
    søkerFnr: string
): TilretteleggingDTO[] => {
    const dto: TilretteleggingDTO[] = [];
    tilrettelegging.forEach((t) => {
        const arbeidsforhold = mapArbeidsforholdForTilrettelegging(t, søkerFnr);
        if (t.helTilrettelegging) {
            const helTilrettelegging = mapHelTilrettelegging(t, arbeidsforhold);
            if (helTilrettelegging) {
                dto.push(helTilrettelegging);
            }
        }
        if (t.delvisTilrettelegging) {
            const delvisTilrettelegging = mapDelvisTilrettelegging(t, arbeidsforhold);
            if (delvisTilrettelegging) {
                dto.push(delvisTilrettelegging);
            }
        }
        if (t.ingenTilrettelegging) {
            const ingenTilrettelegging = mapIngenTilrettelegging(t, arbeidsforhold);
            if (ingenTilrettelegging) {
                dto.push(ingenTilrettelegging);
            }
        }
    });
    return dto;
};

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
