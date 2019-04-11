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
            type: Arbeidsforholdstype.VIRKSOMHET
        })),
        ...selvstendigNæringsdrivendeInformasjon.map((næring: Næring) => ({
            value: næring.navnPåNæringen,
            label: næring.navnPåNæringen,
            type: Arbeidsforholdstype.SELVSTENDIG
        })),
        ...andreInntekterSiste10Mnd.map((annenInntekt: AnnenInntekt) => ({
            value: annenInntekt.type,
            label: annenInntekt.type,
            type: Arbeidsforholdstype.PRIVAT
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
