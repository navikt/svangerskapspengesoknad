import { Søknadsgrunnlag } from 'app/types/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

export const getRelevanteArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[],
    søknadsgrunnlag: Søknadsgrunnlag[]
): Arbeidsforhold[] => {
    return arbeidsforhold.filter((forhold) =>
        søknadsgrunnlag.some((grunnlag) => grunnlag.id === forhold.arbeidsgiverId)
    );
};

export const getArbeidsforholdNavnFromId = (
    id: string | undefined,
    arbeidsforhold: Arbeidsforhold[]
): string | undefined => {
    const arbForhold = arbeidsforhold.find((forhold) => forhold.arbeidsgiverId === id);

    return arbForhold !== undefined ? arbForhold.arbeidsgiverNavn : undefined;
};
