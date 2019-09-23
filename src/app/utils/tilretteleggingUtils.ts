import { Søknadsgrunnlag } from 'app/types/Søknad';
import {
    Arbeidsforholdstype,
    UferdigTilrettelegging,
    Tilrettelegging,
    Tilretteleggingstype
} from 'app/types/Tilrettelegging';
import {
    ArbeidsforholdDTO,
    HelTilretteleggingDTO,
    IngenTilretteleggingDTO,
    DelvisTilretteleggingDTO,
    TilretteleggingDTO
} from '../types/TilretteleggingDTO';

export const mapGrunnlagTilTilrettelegging = (søknadsgrunnlag: Søknadsgrunnlag[]) => {
    return søknadsgrunnlag.map(({ id, type }) => {
        const arbeidsgiversId =
            type === Arbeidsforholdstype.VIRKSOMHET || type === Arbeidsforholdstype.PRIVAT ? { id } : {};

        return {
            id,
            vedlegg: [],
            arbeidsforhold: {
                ...arbeidsgiversId,
                type
            }
        };
    });
};

export const mergeSøknadsgrunnlagIntoTilrettelegging = (
    søknadsgrunnlag: Søknadsgrunnlag[],
    existingTilrettelegging: UferdigTilrettelegging[]
) => {
    const nyeTilrettelegginger = mapGrunnlagTilTilrettelegging(
        søknadsgrunnlag.filter(
            (grunnlag: Søknadsgrunnlag) =>
                !existingTilrettelegging.find((t: UferdigTilrettelegging) => t.id === grunnlag.id)
        )
    );

    const selectedTilrettelegging = existingTilrettelegging.filter((t) =>
        søknadsgrunnlag.map((s) => s.id).includes(t.id)
    );

    return [...selectedTilrettelegging, ...nyeTilrettelegginger];
};

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
        tilrettelagtArbeidFom: tilrettelegging.helTilrettelegging[0].tilrettelagtArbeidFom
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
        tilrettelagtArbeidFom: tilrettelegging.delvisTilrettelegging[0].tilrettelagtArbeidFom,
        stillingsprosent: tilrettelegging.delvisTilrettelegging[0].stillingsprosent
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
        slutteArbeidFom: tilrettelegging.ingenTilrettelegging[0].slutteArbeidFom
    };
};

const mapArbeidsforholdForTilrettelegging = (tilrettelegging: UferdigTilrettelegging): ArbeidsforholdDTO => {
    switch (tilrettelegging.arbeidsforhold.type) {
        case Arbeidsforholdstype.FRILANSER:
            return {
                type: Arbeidsforholdstype.FRILANSER,
                risikoFaktorer: tilrettelegging.risikoFaktorer,
                tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak
            };
        case Arbeidsforholdstype.SELVSTENDIG:
            return {
                type: Arbeidsforholdstype.SELVSTENDIG,
                risikoFaktorer: tilrettelegging.risikoFaktorer,
                tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak
            };
        case Arbeidsforholdstype.PRIVAT:
            return {
                type: Arbeidsforholdstype.PRIVAT,
                id: tilrettelegging.arbeidsforhold.id || tilrettelegging.id
            };
        case Arbeidsforholdstype.VIRKSOMHET:
            return {
                type: Arbeidsforholdstype.VIRKSOMHET,
                id: tilrettelegging.arbeidsforhold.id || tilrettelegging.id
            };
    }
};

export const mapTilretteleggingerTilDTO = (tilrettelegging: UferdigTilrettelegging[]): TilretteleggingDTO[] => {
    const dto: TilretteleggingDTO[] = [];
    tilrettelegging.forEach((t) => {
        const arbeidsforhold = mapArbeidsforholdForTilrettelegging(t);
        if (t.helTilrettelegging) {
            t.helTilrettelegging.forEach(() => {
                const helTilrettelegging = mapHelTilrettelegging(t, arbeidsforhold);
                if (helTilrettelegging) {
                    dto.push(helTilrettelegging);
                }
            });
        }
        if (t.delvisTilrettelegging) {
            t.delvisTilrettelegging.forEach(() => {
                const delvisTilrettelegging = mapDelvisTilrettelegging(t, arbeidsforhold);
                if (delvisTilrettelegging) {
                    dto.push(delvisTilrettelegging);
                }
            });
        }
        if (t.ingenTilrettelegging) {
            t.ingenTilrettelegging.forEach(() => {
                const ingenTilrettelegging = mapIngenTilrettelegging(t, arbeidsforhold);
                if (ingenTilrettelegging) {
                    dto.push(ingenTilrettelegging);
                }
            });
        }
    });
    return dto;
};
