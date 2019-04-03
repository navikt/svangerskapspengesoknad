import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'app/formik/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import ArbeidSeksjon from '../ArbeidSeksjon';
import FrilansOppdrag from './FrilansOppdrag';
import { CustomFormikProps } from 'app/types/Formik';
import { normaliserFrilansinformasjon } from '../utils/normaliser';
import _ from 'lodash';

interface OwnProps {
    formikProps: CustomFormikProps;
}

type Props = OwnProps & InjectedIntlProps;
const FrilansSpørsmål: FunctionComponent<Props> = (props: Props) => {
    const { formikProps, intl } = props;
    const normalisertFrilansinfo = normaliserFrilansinformasjon(formikProps.values.søker);

    const visKomponent = {
        oppstartsdato: formikProps.values.søker.harJobbetSomFrilansSiste10Mnd === true,
        jobberFremdelesSomFrilans: !_.isUndefined(normalisertFrilansinfo.oppstart),
        harJobbetForNærVennEllerFamilieSiste10Mnd: !_.isUndefined(normalisertFrilansinfo.jobberFremdelesSomFrilans),
        driverFosterhjem: !_.isUndefined(normalisertFrilansinfo.harJobbetForNærVennEllerFamilieSiste10Mnd),
    };

    return (
        <>
            <Block>
                <JaNeiSpørsmål
                    twoColumns
                    name="søker.harJobbetSomFrilansSiste10Mnd"
                    legend={getMessage(intl, 'arbeidsforhold.frilans.erFrilanser')}
                    infoboksTekst={getMessage(intl, 'arbeidsforhold.frilans.erFrilanser.infoboksTekst')}
                />
            </Block>

            <Block visible={visKomponent.oppstartsdato}>
                <DatoInput
                    fullskjermKalender
                    name="søker.frilansInformasjon.oppstart"
                    label={getMessage(intl, 'arbeidsforhold.frilans.fraOgMed')}
                />
            </Block>

            <Block visible={visKomponent.jobberFremdelesSomFrilans}>
                <JaNeiSpørsmål
                    twoColumns
                    name={'søker.frilansInformasjon.jobberFremdelesSomFrilans'}
                    legend={getMessage(intl, 'arbeidsforhold.frilans.erDuFremdelesFrilanser')}
                />
            </Block>

            <Block visible={visKomponent.harJobbetForNærVennEllerFamilieSiste10Mnd}>
                <ArbeidSeksjon
                    name="søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd"
                    listName="søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd"
                    type={'test'}
                    legend={getMessage(intl, 'arbeidsforhold.frilans.oppdragForNæreVennerEllerFamilieSiste10Mnd')}
                    buttonLabel={getMessage(intl, 'leggTil')}
                    formComponent={FrilansOppdrag}
                />
            </Block>

            <Block visible={visKomponent.driverFosterhjem}>
                <JaNeiSpørsmål
                    twoColumns
                    name={'søker.frilansInformasjon.driverFosterhjem'}
                    legend={getMessage(intl, 'arbeidsforhold.frilans.driverFosterhjem')}
                />
            </Block>
        </>
    );
};

export default injectIntl(FrilansSpørsmål);
