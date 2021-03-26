import React from 'react';
import { useIntl } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

import { formatDate } from 'app/utils/formatDate';
import './arbeidsforhold.less';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';

interface InformasjonOmArbeidsforholdProps {
    arbeidsforhold: Arbeidsforhold;
}

type Props = InformasjonOmArbeidsforholdProps;
const InformasjonOmArbeidsforhold: React.FunctionComponent<Props> = ({ arbeidsforhold }: Props) => {
    const intl = useIntl();
    const cls = BEMHelper('arbeidsforholdInfoBox');
    return (
        <div className={cls.block}>
            <div className={cls.element('topRow')}>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr' && (
                    <Normaltekst>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.organisasjonsnummer', {
                            organisasjonsnummer: arbeidsforhold.arbeidsgiverId,
                        })}
                    </Normaltekst>
                )}
                <Normaltekst className={cls.element('stillingsprosent')}>
                    {getMessage(intl, 'annenInntekt.arbeidsforhold.stillingsprosent', {
                        stillingsprosent: arbeidsforhold.stillingsprosent,
                    })}
                </Normaltekst>
            </div>
            <Element>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr'
                    ? arbeidsforhold.arbeidsgiverNavn
                    : getMessage(intl, 'arbeidsgiver')}
            </Element>
            <Normaltekst>
                {getMessage(intl, 'annenInntekt.arbeidsforhold.periode', {
                    fom: formatDate(dateToISOFormattedDateString(arbeidsforhold.fom)),
                    tom: arbeidsforhold.tom
                        ? formatDate(dateToISOFormattedDateString(arbeidsforhold.tom))
                        : getMessage(intl, 'pågående'),
                })}
            </Normaltekst>
        </div>
    );
};
export default InformasjonOmArbeidsforhold;
