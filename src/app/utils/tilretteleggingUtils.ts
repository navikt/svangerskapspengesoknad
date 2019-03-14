import { Søknadsgrunnlag } from 'app/types/Søknad';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

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
