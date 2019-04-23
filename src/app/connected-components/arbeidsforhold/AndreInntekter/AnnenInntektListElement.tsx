import React, { StatelessComponent } from 'react';
import { ModalSummaryProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import InteractiveListElement from 'common/components/interactive-list-element/InteractiveListElement';
import { prettifyTidsperiode } from 'app/utils/formatDate';
import getMessage from 'common/util/i18nUtils';
import { Countries } from '../../../utils/getCountries';
import { getAnnenInntektElementTitle } from '../../../utils/arbeidsforholdUtils';

type Props = ModalSummaryProps<AnnenInntekt> & {
    countries: Countries;
};

const AnnenInntektListElement: StatelessComponent<Props> = ({ element, countries, intl, ...rest }) => {
    return (
        <InteractiveListElement
            title={getAnnenInntektElementTitle(element, countries, intl)}
            text={prettifyTidsperiode(element.tidsperiode)}
            deleteLinkText={getMessage(intl, 'utenlandsopphold.land.slett')}
            {...rest}
        />
    );
};

export default AnnenInntektListElement;
