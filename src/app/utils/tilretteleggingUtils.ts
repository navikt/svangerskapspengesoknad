import { Søknadsgrunnlag } from 'app/types/Søknad';
import { Arbeidsforholdstype, UbestemtTilrettelegging } from 'app/types/Tilrettelegging';

export const mapGrunnlagTilTilrettelegging = (søknadsgrunnlag: Søknadsgrunnlag[]): UbestemtTilrettelegging[] => {
    return søknadsgrunnlag.map(({ id, type }) => {
        const arbeidsgiversId = type === Arbeidsforholdstype.VIRKSOMHET ? { id } : {};

        return {
            id,
            arbeidsforhold: {
                ...arbeidsgiversId,
                type,
            },
        };
    });
};
