import React, { FunctionComponent } from 'react';
import moment from 'moment';
import Block from 'common/components/block/Block';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import DuHarSvartNeiListe from '../DuHarSvartNeiListe';

interface Props {
    frilansInformasjon: Partial<FrilansInformasjon>;
}

const InformasjonOmFrilans: FunctionComponent<Props> = ({ frilansInformasjon }) => {
    return (
        <Block margin="xxs">
            <div className="grayInfoBox">
                <Element>FRILANSOPPDRAG</Element>
                <Normaltekst>{moment(frilansInformasjon.oppstart).format('DD.MM.YYYY')}</Normaltekst>
                <DuHarSvartNeiListe
                    frilansOppsummering={true}
                    hattInntektSomFosterforelder={frilansInformasjon.driverFosterhjem}
                    nyoppstartetFrilanser={frilansInformasjon.jobberFremdelesSomFrilans}
                    hattOppdragForNærVennEllerFamilie={frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd}
                />
            </div>
        </Block>
    );
};

export default InformasjonOmFrilans;
