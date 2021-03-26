import { Locale } from '@navikt/fp-common';
import React, { FunctionComponent } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Velkommen from './pages/Velkommen';

interface Props {
    locale: Locale;
    onChangeLocale: (activeLocale: Locale) => void;
}

const Svangerskapspenger: FunctionComponent<Props> = ({ locale, onChangeLocale }) => {
    return (
        <>
            <BrowserRouter>
                <Route
                    path="/"
                    exact={true}
                    component={() => <Velkommen locale={locale} onChangeLocale={onChangeLocale} />}
                />
            </BrowserRouter>
        </>
    );
};

export default Svangerskapspenger;
