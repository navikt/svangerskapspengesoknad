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
import Block from 'common/components/block/Block';

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
                    <Block margin="xxs">
                        {tilrett.type.includes(Tilretteleggingstype.HEL) && (
                            <FormattedHTMLMessage
                                id="oppsummering.tilrettelegging.info.jobbeFullt"
                                values={{
                                    startDato: moment(tilrett.helTilrettelegging!.tilrettelagtArbeidFom[0]).format(
                                        'Do MMMM YYYY'
                                    )
                                }}
                            />
                        )}
                    </Block>
                    <Block margin="xxs">
                        {tilrett.type.includes(Tilretteleggingstype.DELVIS) && (
                            <FormattedHTMLMessage
                                id="oppsummering.tilrettelegging.info.jobbeDelvis"
                                values={{
                                    startDato: moment(tilrett.delvisTilrettelegging![0].tilrettelagtArbeidFom).format(
                                        'Do MMMM YYYY'
                                    ),
                                    prosent: tilrett.delvisTilrettelegging![0].stillingsprosent
                                }}
                            />
                        )}
                    </Block>
                    <Block margin="xxs">
                        {tilrett.type.includes(Tilretteleggingstype.INGEN) && (
                            <FormattedHTMLMessage
                                id="oppsummering.tilrettelegging.info.ikkeJobbe"
                                values={{
                                    startDato: moment(tilrett.ingenTilrettelegging!.slutteArbeidFom[0]).format(
                                        'Do MMMM YYYY'
                                    )
                                }}
                            />
                        )}
                    </Block>
                    {(tilrett.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
                        tilrett.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG) && (
                        <>
                            <Block margin="xs">
                                <OppsummeringBeskrivelse
                                    label="Farer for å skade det ufødte barnet:"
                                    innhold={tilrett.risikoFaktorer || ''}
                                />
                            </Block>
                            <Block margin="xs">
                                <OppsummeringBeskrivelse
                                    label="Hvordan du kan jobbe annerledes:"
                                    innhold={tilrett.tilretteleggingstiltak || ''}
                                />
                            </Block>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default TilretteleggingOppsummering;
