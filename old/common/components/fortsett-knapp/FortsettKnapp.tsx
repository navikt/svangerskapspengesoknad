import React from 'react';
import { useIntl } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import getMessage from 'common/util/i18nUtils';
import { SubmitEvent } from '../../../app/types/events';
import './fortsettKnapp.less';

interface FortsettKnappProps {
    location?: string;
    children?: JSX.Element | string;
    onClick?: (e: SubmitEvent) => void;
}

const FortsettKnapp = (props: FortsettKnappProps) => {
    const intl = useIntl();
    const { children, onClick } = props;

    return (
        <Hovedknapp className="fortsettKnapp" htmlType="submit" onClick={onClick}>
            {children || getMessage(intl, 'fortsettknapp.label')}
        </Hovedknapp>
    );
};

export default FortsettKnapp;
