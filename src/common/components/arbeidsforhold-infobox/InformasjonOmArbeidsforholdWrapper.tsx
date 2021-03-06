import React from 'react';
import { useIntl } from 'react-intl';

import { Normaltekst } from 'nav-frontend-typografi';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';

import ArbeidsforholdInfoBox from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforhold';
import getMessage from 'common/util/i18nUtils';

import './arbeidsforhold.less';
import { guid } from 'nav-frontend-js-utils';

interface ArbeidsforholdInfoWrapperProps {
    arbeidsforhold: Arbeidsforhold[] | undefined;
}
const InformasjonOmArbeidsforholdWrapper: React.StatelessComponent<ArbeidsforholdInfoWrapperProps> = ({
    arbeidsforhold,
}) => {
    const intl = useIntl();
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <React.Fragment>
            {!harArbeidsforhold && (
                <div className="arbeidsforholdInfoBox">
                    <Normaltekst>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.ingenRegistrerteArbeidsforhold')}
                    </Normaltekst>
                </div>
            )}
            {harArbeidsforhold && (
                <ul className="arbeidsforholdList">
                    {arbeidsforhold!.map((arbeidsforholdElement: Arbeidsforhold) => (
                        <li key={guid()}>
                            <ArbeidsforholdInfoBox
                                key={arbeidsforholdElement.arbeidsgiverId}
                                arbeidsforhold={arbeidsforholdElement}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
};

export default InformasjonOmArbeidsforholdWrapper;
