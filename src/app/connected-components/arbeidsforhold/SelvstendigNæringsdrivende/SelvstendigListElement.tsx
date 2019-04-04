import React from 'react';
import { ModalSummaryProps } from '../ArbeidSeksjon/ArbeidSeksjon';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import BEMHelper from 'common/util/bem';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from 'app/utils/formatDate';
import Pencil from 'common/components/interactive-list-element/Pencil';
import { FormattedMessage } from 'react-intl';

import './selvstendigNæringsdrivende.less';

const SelvstendigListElement: React.StatelessComponent<ModalSummaryProps<Næring>> = ({
    element,
    intl,
    onEdit,
    onDelete,
    editButtonAriaText,
    deleteButtonAriaText,
}) => {
    const cls = BEMHelper('selvstendigListElement');
    return (
        <div className={cls.className}>
            <div className={cls.element('topRow')}>
                {element.registrertINorge && (
                    <EtikettLiten>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.organisasjonsnummer', {
                            organisasjonsnummer: element.organisasjonsnummer,
                        })}
                    </EtikettLiten>
                )}
                <button
                    type="button"
                    className={cls.element('editButton')}
                    onClick={onEdit}
                    aria-label={editButtonAriaText || getMessage(intl, 'rediger')}>
                    <Pencil width="19px" height="19px" />
                </button>
            </div>
            <Element>{element.navnPåNæringen}</Element>
            <div className={cls.element('bottom')}>
                <Normaltekst>
                    {getMessage(intl, 'annenInntekt.arbeidsforhold.periode', {
                        fom: formatDate(element.tidsperiode.fom),
                        tom: element.tidsperiode.tom
                            ? formatDate(element.tidsperiode.tom)
                            : getMessage(intl, 'pågående'),
                    })}
                </Normaltekst>
                <button
                    className={cls.element('deleteButton')}
                    onClick={onDelete}
                    type="button"
                    aria-label={deleteButtonAriaText}>
                    <FormattedMessage id="slett" />
                </button>
            </div>
        </div>
    );
};
export default SelvstendigListElement;
