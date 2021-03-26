import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import BEMHelper from 'common/util/bem';
import { default as Etikett, EtikettBaseProps } from 'nav-frontend-etiketter';
import { useIntl } from 'react-intl';

import './interactiveListElement.less';
import getMessage from 'common/util/i18nUtils';
import Pencil from './Pencil';

export interface InteractiveListElementProps {
    style?: 'gray' | 'grayWithBorder';
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText?: string;
    deleteButtonAriaText?: string;
}

interface AllListElementProps extends InteractiveListElementProps {
    title: string;
    text: string;
    deleteLinkText: string;
    etikettProps?: EtikettBaseProps;
}

const bem = BEMHelper('interactiveListElement');

const InteractiveListElement: React.FunctionComponent<AllListElementProps> = ({
    title,
    text,
    deleteLinkText,
    etikettProps,
    style = 'gray',
    deleteButtonAriaText,
    editButtonAriaText,
    onDelete,
    onEdit,
}) => {
    const intl = useIntl();
    return (
        <li className={bem.classNames(bem.block, bem.modifier(style))}>
            <div className={bem.element('top')}>
                <Normaltekst className="title">{title}</Normaltekst>
                <button
                    type="button"
                    className={bem.element('editButton')}
                    onClick={onEdit}
                    aria-label={editButtonAriaText || getMessage(intl, 'rediger')}
                >
                    <Pencil />
                </button>
            </div>
            <Normaltekst className={bem.element('text')}>{text}</Normaltekst>
            <div className={bem.element('bottom')}>
                {etikettProps !== undefined && <Etikett {...etikettProps} />}
                <button
                    className={bem.element('deleteButton')}
                    onClick={onDelete}
                    type="button"
                    aria-label={deleteButtonAriaText}
                >
                    {deleteLinkText}
                </button>
            </div>
        </li>
    );
};
export default InteractiveListElement;
