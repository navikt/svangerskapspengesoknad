import React, { FunctionComponent } from 'react';
import moment from 'moment';
import BEMHelper from 'common/util/bem';

import './tilretteleggingOppsummering.less';
import { EtikettLiten } from 'nav-frontend-typografi';
import Tilrettelegging, { UferdigTilrettelegging, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getArbeidsforholdNavnFromId } from 'app/utils/arbeidsforholdUtils';
import { guid } from 'nav-frontend-js-utils';
import { FormattedHTMLMessage } from 'react-intl';

const cls = BEMHelper('tilretteleggingOppsummering');

interface Props {
    tilrettelegging: UferdigTilrettelegging[];
    arbeidsforhold: Arbeidsforhold[];
}

const renderDates = (startDato: Date, tilretteleggingsDato?: Date, stillingsprosent?: number) => {
    if (tilretteleggingsDato !== undefined && stillingsprosent !== undefined) {
        const midtDato: Date = moment(tilretteleggingsDato)
            .subtract(24, 'hours')
            .toDate();

        return (
            <>
                <div className="textWrapper">
                    <FormattedHTMLMessage
                        id="oppsummering.tilrettelegging.info.startSlutt"
                        values={{
                            startDato: moment(startDato).format('Do MMMM YYYY'),
                            sluttDato: moment(midtDato).format('Do MMMM YYYY'),
                        }}
                    />
                </div>
                <div className="textWrapper">
                    <FormattedHTMLMessage
                        id="oppsummering.tilrettelegging.info.startSluttProsent"
                        values={{
                            startDato: moment(startDato).format('Do MMMM YYYY'),
                            sluttDato: moment(midtDato).format('Do MMMM YYYY'),
                            prosent: stillingsprosent,
                        }}
                    />
                </div>
            </>
        );
    } else if (tilretteleggingsDato !== undefined) {
        const midtDato: Date = moment(tilretteleggingsDato)
            .subtract(24, 'hours')
            .toDate();

        return (
            <>
                <div className="textWrapper">
                    <FormattedHTMLMessage
                        id="oppsummering.tilrettelegging.info.startSlutt"
                        values={{
                            startDato: moment(startDato).format('Do MMMM YYYY'),
                            sluttDato: moment(midtDato).format('Do MMMM YYYY'),
                        }}
                    />
                </div>
                <div className="textWrapper">
                    <FormattedHTMLMessage
                        id="oppsummering.tilrettelegging.info.start"
                        values={{
                            startDato: moment(tilretteleggingsDato).format('Do MMMM YYYY'),
                        }}
                    />
                </div>
            </>
        );
    } else {
        return (
            <FormattedHTMLMessage
                id="oppsummering.tilrettelegging.info.hel"
                values={{
                    startDato: moment(startDato).format('Do MMMM YYYY'),
                }}
            />
        );
    }
};

const renderContent = (tilrettelegging: Tilrettelegging) => {
    switch (tilrettelegging.type) {
        case Tilretteleggingstype.DELVIS:
            return renderDates(
                tilrettelegging.behovForTilretteleggingFom,
                tilrettelegging.tilrettelagtArbeidFom,
                tilrettelegging.stillingsprosent
            );
        case Tilretteleggingstype.HEL:
            return renderDates(tilrettelegging.behovForTilretteleggingFom, tilrettelegging.tilrettelagtArbeidFom);
        case Tilretteleggingstype.INGEN:
            return renderDates(tilrettelegging.behovForTilretteleggingFom);
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
