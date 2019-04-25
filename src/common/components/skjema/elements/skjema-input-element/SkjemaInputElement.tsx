import React from 'react';
const { guid } = require('nav-frontend-js-utils');
import classnames from 'classnames';
import SkjemaelementFeilmelding from 'common/lib/validation/errors/SkjemaelementFeilmelding';
import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';
import { Element } from 'nav-frontend-typografi';

export interface Props {
    label: string | React.ReactNode;
    infoboksTekst?: string | React.ReactNode;
    feil?: SkjemaelementFeil;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<Props> = (props: Props) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classnames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined
            })}>
            {typeof label === 'string' ? (
                <label className="skjemaelement__label" htmlFor={inputId}>
                    <Element>{label}</Element>
                </label>
            ) : (
                label
            )}
            <div
                className={classnames({
                    'skjema__feilomrade--harFeil': feil !== undefined
                })}>
                {children}
            </div>
            <SkjemaelementFeilmelding feil={feil} />
        </div>
    );
};

export default SkjemaInputElement;
