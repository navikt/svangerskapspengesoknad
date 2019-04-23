import React, { FunctionComponent } from 'react';
import moment from 'moment';
import BEMHelper from 'common/util/bem';

import './tilretteleggingOppsummering.less';
import { EtikettLiten } from 'nav-frontend-typografi';
import { UferdigTilrettelegging, Tilretteleggingstype, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getArbeidsforholdNavnFromId } from 'app/utils/arbeidsforholdUtils';
import { guid } from 'nav-frontend-js-utils';
import { FormattedHTMLMessage } from 'react-intl';
import OppsummeringBeskrivelse from '../OppsummeringBeskrivelse';

const cls = BEMHelper('tilretteleggingOppsummering');

interface Props {
    tilrettelegging: UferdigTilrettelegging[];
    arbeidsforhold: Arbeidsforhold[];
}

const TilretteleggingOppsummering: FunctionComponent<Props> = ({ tilrettelegging, arbeidsforhold }) => {
    return (
        <>
            {tilrettelegging.map((tilrett: UferdigTilrettelegging) => (
                <div key={guid()} className={cls.element('container')}>
                    <EtikettLiten>
                        {getArbeidsforholdNavnFromId(tilrett.arbeidsforhold.id, arbeidsforhold) || tilrett.id}
                    </EtikettLiten>
                    <div className="margin-xs">
                        {tilrett.type.includes(Tilretteleggingstype.HEL) && (
                            <FormattedHTMLMessage
                                id="oppsummering.tilrettelegging.info.jobbeFullt"
                                values={{
                                    startDato: moment(tilrett.helTilrettelegging!.tilrettelagtArbeidFom).format(
                                        'Do MMMM YYYY'
                                    )
                                }}
                            />
                        )}
                    </div>
                    <div className="margin-xs">
                        {tilrett.type.includes(Tilretteleggingstype.DELVIS) && (
                            <FormattedHTMLMessage
                                id="oppsummering.tilrettelegging.info.jobbeDelvis"
                                values={{
                                    startDato: moment(tilrett.delvisTilrettelegging!.tilrettelagtArbeidFom).format(
                                        'Do MMMM YYYY'
                                    ),
                                    prosent: tilrett.delvisTilrettelegging!.stillingsprosent
                                }}
                            />
                        )}
                    </div>
                    <div className="margin-xs">
                        {tilrett.type.includes(Tilretteleggingstype.INGEN) && (
                            <FormattedHTMLMessage
                                id="oppsummering.tilrettelegging.info.ikkeJobbe"
                                values={{
                                    startDato: moment(tilrett.ingenTilrettelegging!.slutteArbeidFom).format(
                                        'Do MMMM YYYY'
                                    )
                                }}
                            />
                        )}
                    </div>
                    {(tilrett.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
                        tilrett.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG) && (
                        <>
                            <div className="margin-s">
                                <OppsummeringBeskrivelse
                                    label="Farer for å skade det ufødte barnet:"
                                    innhold={tilrett.risikoFaktorer || ''}
                                />
                            </div>
                            <div className="margin-s">
                                <OppsummeringBeskrivelse
                                    label="Hvordan du kan jobbe annerledes:"
                                    innhold={tilrett.tilretteleggingstiltak || ''}
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default TilretteleggingOppsummering;
