import { Søknadstype, UferdigSøknad, Søknadsgrunnlag } from 'app/types/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { UferdigTilrettelegging, Tilrettelegging, Tilretteleggingstype } from '../types/Tilrettelegging';
import SøknadDTO from '../types/SøknadDTO';
import {
    TilretteleggingDTO,
    HelTilretteleggingDTO,
    DelvisTilretteleggingDTO,
    IngenTilretteleggingDTO
} from '../types/TilretteleggingDTO';
import { Søker } from '../types/Søker';

const fjernForkastetTilrettelegging = (tilrettelegging: UferdigTilrettelegging[], søknadsgrunnlag: Søknadsgrunnlag[]) =>
    tilrettelegging.filter((t) => søknadsgrunnlag.some((g) => g.id === t.id));

const areDefined = (...items: any[]) => items.some((item) => item !== undefined);

const mapHelTilrettelegging = (tilrettelegging: Tilrettelegging): HelTilretteleggingDTO | undefined => {
    if (!tilrettelegging.helTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.HEL,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold: tilrettelegging.arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        tilrettelagtArbeidFom: tilrettelegging.helTilrettelegging!.tilrettelagtArbeidFom
    };
};

const mapDelvisTilrettelegging = (tilrettelegging: Tilrettelegging): DelvisTilretteleggingDTO | undefined => {
    if (!tilrettelegging.delvisTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.DELVIS,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold: tilrettelegging.arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        tilrettelagtArbeidFom: tilrettelegging.delvisTilrettelegging!.tilrettelagtArbeidFom,
        stillingsprosent: tilrettelegging.delvisTilrettelegging!.stillingsprosent
    };
};
const mapIngenTilrettelegging = (tilrettelegging: Tilrettelegging): IngenTilretteleggingDTO | undefined => {
    if (!tilrettelegging.ingenTilrettelegging) {
        return undefined;
    }
    return {
        type: Tilretteleggingstype.INGEN,
        behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
        arbeidsforhold: tilrettelegging.arbeidsforhold,
        vedlegg: tilrettelegging.vedlegg,
        slutteArbeidFom: tilrettelegging.ingenTilrettelegging.slutteArbeidFom
    };
};

export const mapTilretteleggingerTilDTO = (tilrettelegging: UferdigTilrettelegging[]): TilretteleggingDTO[] => {
    const dto: TilretteleggingDTO[] = [];
    tilrettelegging.forEach((t) => {
        if (t.helTilrettelegging) {
            const helTilrettelegging = mapHelTilrettelegging(t);
            if (helTilrettelegging) {
                dto.push(helTilrettelegging);
            }
        }
        if (t.delvisTilrettelegging) {
            const delvisTilrettelegging = mapDelvisTilrettelegging(t);
            if (delvisTilrettelegging) {
                dto.push(delvisTilrettelegging);
            }
        }
        if (t.ingenTilrettelegging) {
            const ingenTilrettelegging = mapIngenTilrettelegging(t);
            if (ingenTilrettelegging) {
                dto.push(ingenTilrettelegging);
            }
        }
    });
    return dto;
};

export const processUtfyltSøknad = (utfyltSøknad: UferdigSøknad, vedlegg: Attachment[]): SøknadDTO | undefined => {
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
        fjernForkastetTilrettelegging(utfyltSøknad.tilrettelegging, utfyltSøknad.søknadsgrunnlag)
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
