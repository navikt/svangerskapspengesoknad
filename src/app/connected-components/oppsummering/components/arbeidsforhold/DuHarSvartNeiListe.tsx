import React, { FunctionComponent } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';

import './duHarSvartNeiListe.less';

const cls = BEMHelper('duHarSvartNeiListe');

interface Props {
    harJobbetSomSelvstendigNæringsdrivende?: boolean;
    harJobbetFrilans?: boolean;
    harHattAndreInntektskilder?: boolean;
    hattInntektSomFosterforelder?: boolean;
    nyoppstartetFrilanser?: boolean;
    hattOppdragForNærVennEllerFamilie?: boolean;
    arbeidsforholdOppsummering?: boolean;
    frilansOppsummering?: boolean;
    selvstendigOppsummering?: boolean;
}

const DuHarSvartNeiListe: FunctionComponent<Props> = ({
    harJobbetSomSelvstendigNæringsdrivende,
    harJobbetFrilans,
    harHattAndreInntektskilder,
    hattInntektSomFosterforelder,
    nyoppstartetFrilanser,
    hattOppdragForNærVennEllerFamilie,
    arbeidsforholdOppsummering,
    frilansOppsummering,
    selvstendigOppsummering
}) => {
    return (
        <div>
            <div className={cls.element('overskrift')}>
                <FormattedHTMLMessage id="oppsummering.arbeidsforhold.svar" />
            </div>
            <ul className={cls.element('liste')}>
                {arbeidsforholdOppsummering && !harJobbetSomSelvstendigNæringsdrivende && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig" />
                    </li>
                )}
                {arbeidsforholdOppsummering && !harJobbetFrilans && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans" />
                    </li>
                )}
                {arbeidsforholdOppsummering && !harHattAndreInntektskilder && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.andreInntekter" />
                    </li>
                )}
                {frilansOppsummering && !hattInntektSomFosterforelder && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans.fosterforelder" />
                    </li>
                )}
                {frilansOppsummering && !nyoppstartetFrilanser && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans.nyoppstartet" />
                    </li>
                )}
                {frilansOppsummering && !hattOppdragForNærVennEllerFamilie && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans.oppdragNærVennFamilie" />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default DuHarSvartNeiListe;
