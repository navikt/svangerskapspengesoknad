import { Søknadsgrunnlag } from 'app/types/Søknad';
import { Arbeidsforholdstype, UferdigTilrettelegging } from 'app/types/Tilrettelegging';

export const mapGrunnlagTilTilrettelegging = (søknadsgrunnlag: Søknadsgrunnlag[]) => {
    return søknadsgrunnlag.map(({ id, type }) => {
        const arbeidsgiversId = type === Arbeidsforholdstype.VIRKSOMHET ? { id } : {};

        return {
            id,
            vedlegg: [],
            arbeidsforhold: {
                ...arbeidsgiversId,
                type,
            },
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

    return [...nyeTilrettelegginger, ...existingTilrettelegging];
};
