import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';

import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'app/formik/wrappers/DatoInput';
import Block from 'common/components/block/Block';
import ArbeidSeksjon from '../ArbeidSeksjon/ArbeidSeksjon';
import FrilansOppdrag from './FrilansOppdrag';
import { CustomFormikProps } from 'app/types/Formik';
import { cleanupFrilansinformasjon } from '../utils/cleanup';
import _ from 'lodash';
import FrilansListElement from './FrilansListElement';
import InfoBlock from 'common/components/info-block/InfoBlock';

interface OwnProps {
    formikProps: CustomFormikProps;
}

type Props = OwnProps & InjectedIntlProps;
const FrilansSpørsmål: FunctionComponent<Props> = (props: Props) => {
    const { formikProps, intl } = props;
    const normalisertFrilansinfo = cleanupFrilansinformasjon(formikProps.values.søker);

    const visKomponent = {
        oppstartsdato: formikProps.values.søker.harJobbetSomFrilansSiste10Mnd === true,
        jobberFremdelesSomFrilans: !_.isUndefined(normalisertFrilansinfo.oppstart),
        harJobbetForNærVennEllerFamilieSiste10Mnd: !_.isUndefined(normalisertFrilansinfo.jobberFremdelesSomFrilans),
        driverFosterhjem: !_.isUndefined(normalisertFrilansinfo.harJobbetForNærVennEllerFamilieSiste10Mnd)
    };

    return (
        <>
            <Block>
                <JaNeiSpørsmål
                    twoColumns={true}
                    name="søker.harJobbetSomFrilansSiste10Mnd"
                    legend={getMessage(intl, 'arbeidsforhold.frilans.erFrilanser')}
                    infoboksTekst={<FormattedHTMLMessage id={'arbeidsforhold.frilans.erFrilanser.infoboksTekst'} />}
                />
            </Block>

            {formikProps.values.søker.harJobbetSomFrilansSiste10Mnd && (
                <>
                    <Block header={{ title: 'Frilans' }}>
                        <InfoBlock>
                            <Block
                                visible={visKomponent.oppstartsdato}
                                margin={visKomponent.jobberFremdelesSomFrilans ? undefined : 'xxs'}>
                                <DatoInput
                                    fullskjermKalender={true}
                                    name="søker.frilansInformasjon.oppstart"
                                    label={getMessage(intl, 'arbeidsforhold.frilans.fraOgMed')}
                                />
                            </Block>

                            <Block visible={visKomponent.jobberFremdelesSomFrilans}>
                                <JaNeiSpørsmål
                                    twoColumns={true}
                                    name={'søker.frilansInformasjon.jobberFremdelesSomFrilans'}
                                    legend={getMessage(intl, 'arbeidsforhold.frilans.erDuFremdelesFrilanser')}
                                />
                            </Block>

                            <Block visible={visKomponent.harJobbetForNærVennEllerFamilieSiste10Mnd}>
                                <ArbeidSeksjon
                                    name="søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd"
                                    listName="søker.frilansInformasjon.oppdragForNæreVennerEllerFamilieSiste10Mnd"
                                    legend={getMessage(
                                        intl,
                                        'arbeidsforhold.frilans.oppdragForNæreVennerEllerFamilieSiste10Mnd'
                                    )}
                                    buttonLabel={getMessage(intl, 'leggtil')}
                                    summaryListElementComponent={FrilansListElement}
                                    renderForm={(formProps) => <FrilansOppdrag {...formProps} />}
                                    summaryListTitle={{ title: getMessage(intl, 'arbeidsforhold.frilans.listetittel') }}
                                />
                            </Block>

                            <Block visible={visKomponent.driverFosterhjem} margin="s">
                                <JaNeiSpørsmål
                                    twoColumns={true}
                                    name={'søker.frilansInformasjon.driverFosterhjem'}
                                    legend={getMessage(intl, 'arbeidsforhold.frilans.driverFosterhjem')}
                                />
                            </Block>
                        </InfoBlock>
                    </Block>
                </>
            )}
        </>
    );
};

export default injectIntl(FrilansSpørsmål);
