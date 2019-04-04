import React, { StatelessComponent } from 'react';
import { ModalSummaryProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { AnnenInntekt } from 'app/types/AnnenInntekt';
import InteractiveListElement from 'common/components/interactive-list-element/InteractiveListElement';
import { prettifyTidsperiode } from 'app/utils/formatDate';
import getMessage from 'common/util/i18nUtils';

const AnnenInntektListElement: StatelessComponent<ModalSummaryProps<AnnenInntekt>> = ({ element, intl, ...rest }) => {
    return (
        <InteractiveListElement
            title={element.type}
            text={prettifyTidsperiode(element.tidsperiode)}
            deleteLinkText={getMessage(intl, 'utenlandsopphold.land.slett')}
            {...rest}
        />
    );
};

export default AnnenInntektListElement;
