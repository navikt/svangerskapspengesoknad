import * as React from 'react';
import { IntlProvider as Provider } from 'react-intl';
import dayjs from 'dayjs';
import nnMessages from './../intl/nn_NO.json';
import nbMessages from './../intl/nb_NO.json';
import { Språkkode } from '../common-types/Språkkode';
import { allCommonMessages } from '@navikt/fp-common';

interface Props {
    språkkode: Språkkode;
    children: React.ReactNode;
}

dayjs.locale('nb');

const getLanguageMessages = (språkkode: Språkkode) => {
    if (språkkode === 'nb') {
        return { ...nbMessages, ...allCommonMessages.nb };
    } else {
        return { ...nnMessages, ...allCommonMessages.nn };
    }
};

const IntlProvider: React.FunctionComponent<Props> = ({ språkkode, children }) => {
    return (
        <Provider locale={språkkode} messages={getLanguageMessages(språkkode) || {}}>
            {children}
        </Provider>
    );
};
export default IntlProvider;
