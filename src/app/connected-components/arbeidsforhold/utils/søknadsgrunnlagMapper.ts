import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Søker from 'app/types/Søker';
import { SøknadsgrunnlagOption } from '../../../formik/wrappers/VelgSøknadsgrunnlag';
import { InjectedIntl } from 'react-intl';
import { Countries } from '../../../utils/getCountries';
import { getAnnenInntektElementTitle } from '../../../utils/arbeidsforholdUtils';

export const mapArbeidsToSøknadsgrunnlag = (
    søker: Partial<Søker>,
    arbeidsforhold: Arbeidsforhold[],
    intl: InjectedIntl,
    countries: Countries
): SøknadsgrunnlagOption[] => {
    const { selvstendigNæringsdrivendeInformasjon = [], andreInntekterSiste10Mnd = [], frilansInformasjon } = søker;

    return [
        ...arbeidsforhold.map((forhold) => ({
            value: forhold.arbeidsgiverId,
            label: forhold.arbeidsgiverNavn,
            type: Arbeidsforholdstype.VIRKSOMHET
        })),
        ...selvstendigNæringsdrivendeInformasjon.map((næring) => ({
            value: næring.organisasjonsnummer || `${næring.navnPåNæringen}${næring.registrertILand}`,
            label: næring.navnPåNæringen,
            type: Arbeidsforholdstype.SELVSTENDIG
        })),
        ...andreInntekterSiste10Mnd.map((annenInntekt) => ({
            value: annenInntekt.type,
            label: getAnnenInntektElementTitle(annenInntekt, countries, intl),
            type: Arbeidsforholdstype.ANDRE_INNTEKTER
        })),
        ...(frilansInformasjon !== undefined
            ? [
                  {
                      value: 'Frilans',
                      label: 'Frilans',
                      type: Arbeidsforholdstype.FRILANSER
                  }
              ]
            : [])
    ];
};
