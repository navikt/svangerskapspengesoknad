import { Søknadsgrunnlag } from 'app/types/Søknad';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { AnnenInntekt, AnnenInntektType } from '../types/AnnenInntekt';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';

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

export const getAnnenInntektElementTitle = (annenInntekt: AnnenInntekt, intl: InjectedIntl): string => {
    return annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET
        ? `${annenInntekt.arbeidsgiverNavn}`
        : getMessage(intl, 'inntektstype.militær_eller_siviltjeneste');
};
