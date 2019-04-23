import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Søker from 'app/types/Søker';

export const mapArbeidsToSøknadsgrunnlag = (søker: Partial<Søker>, arbeidsforhold: Arbeidsforhold[]) => {
    const { selvstendigNæringsdrivendeInformasjon = [], andreInntekterSiste10Mnd = [], frilansInformasjon } = søker;

    return [
        ...arbeidsforhold.map((forhold: Arbeidsforhold) => ({
            value: forhold.arbeidsgiverId,
            label: forhold.arbeidsgiverNavn,
            type: forhold.arbeidsgiverIdType === 'orgnr' ? Arbeidsforholdstype.VIRKSOMHET : Arbeidsforholdstype.PRIVAT
        })),
        ...selvstendigNæringsdrivendeInformasjon.map((næring: Næring) => ({
            value: næring.organisasjonsnummer,
            label: næring.navnPåNæringen,
            type: Arbeidsforholdstype.SELVSTENDIG
        })),
        ...andreInntekterSiste10Mnd.map((annenInntekt: AnnenInntekt) => ({
            value: annenInntekt.type,
            label: annenInntekt.type,
            type: Arbeidsforholdstype.FRILANSER
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
