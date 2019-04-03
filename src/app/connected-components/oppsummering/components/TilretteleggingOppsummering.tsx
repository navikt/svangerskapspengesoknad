import React, { FunctionComponent } from 'react';
import moment from 'moment';
import BEMHelper from 'common/util/bem';

import './tilretteleggingOppsummering.less';
import { EtikettLiten, Element } from 'nav-frontend-typografi';
import Tilrettelegging, { UferdigTilrettelegging, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getArbeidsforholdNavnFromId } from 'app/utils/arbeidsforholdUtils';
import { guid } from 'nav-frontend-js-utils';

const cls = BEMHelper('tilretteleggingOppsummering');

interface Props {
    tilrettelegging: UferdigTilrettelegging[];
    arbeidsforhold: Arbeidsforhold[];
}

const renderDates = (startDato: Date, tilretteleggingsDato?: Date) => {
    if (tilretteleggingsDato !== undefined) {
        const midtDato: Date = moment(tilretteleggingsDato)
            .subtract(24, 'hours')
            .toDate();

        return (
            <>
                <Element>
                    {moment(startDato).format('Do MMMM YYYY')} - {moment(midtDato).format('Do MMMM YYYY')}
                </Element>
                <Element>{moment(tilretteleggingsDato).format('Do MMMM YYYY')} - Fødselspermisjon</Element>
            </>
        );
    } else {
        return <Element>{moment(startDato).format('Do MMMM YYYY')} - Fødselspermisjon</Element>;
    }
};

const renderContent = (tilrettelegging: Tilrettelegging) => {
    switch (tilrettelegging.type) {
        case Tilretteleggingstype.DELVIS:
            return renderDates(tilrettelegging.behovForTilretteleggingFom, tilrettelegging.tilrettelagtArbeidFom);
        case Tilretteleggingstype.HEL:
            return renderDates(tilrettelegging.behovForTilretteleggingFom, tilrettelegging.tilrettelagtArbeidFom);
        default:
            return null;
    }
};

const TilretteleggingOppsummering: FunctionComponent<Props> = ({ tilrettelegging, arbeidsforhold }) => {
    return (
        <>
            {tilrettelegging.map((tilrett: Tilrettelegging) => (
                <div key={guid()} className={cls.element('container')}>
                    <EtikettLiten>
                        {getArbeidsforholdNavnFromId(tilrett.arbeidsforhold.id, arbeidsforhold)}
                    </EtikettLiten>
                    {renderContent(tilrett)}
                </div>
            ))}
        </>
    );
};

export default TilretteleggingOppsummering;
