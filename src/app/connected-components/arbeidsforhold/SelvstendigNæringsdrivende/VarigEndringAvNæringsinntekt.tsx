import React, { FunctionComponent } from 'react';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DatoInput from 'app/formik/wrappers/DatoInput';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';

interface VarigEndringAvNæringsinntektProps {
    values: Partial<Næring>;
}

type Props = VarigEndringAvNæringsinntektProps & InjectedIntlProps;
const VarigEndringAvNæringsinntekt: FunctionComponent<Props> = (props: Props) => {
    const { values, intl } = props;

    const visDato = values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === true;
    const visNæringsinntektEtterEndring =
        visDato &&
        values.endringAvNæringsinntektInformasjon !== undefined &&
        values.endringAvNæringsinntektInformasjon.dato !== undefined;

    const visForklaring =
        visNæringsinntektEtterEndring &&
        values.endringAvNæringsinntektInformasjon !== undefined &&
        values.endringAvNæringsinntektInformasjon.næringsinntektEtterEndring !== undefined;

    return (
        <>
            <Block>
                <JaNeiSpørsmål
                    name="hattVarigEndringAvNæringsinntektSiste4Kalenderår"
                    legend={getMessage(
                        intl,
                        'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.hattVarigEndringAvNæringsinntektSiste4Kalenderår'
                    )}
                />
            </Block>

            <Block visible={visDato}>
                <DatoInput
                    fullskjermKalender={true}
                    name="endringAvNæringsinntektInformasjon.dato"
                    label={getMessage(intl, 'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.dato')}
                />
            </Block>

            <Block visible={visNæringsinntektEtterEndring}>
                <InputField
                    name="endringAvNæringsinntektInformasjon.næringsinntektEtterEndring"
                    label={getMessage(
                        intl,
                        'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.næringsinntektEtterEndring'
                    )}
                    required={true}
                />
            </Block>

            <Block visible={visForklaring}>
                <InputField
                    name="endringAvNæringsinntektInformasjon.forklaring"
                    label={getMessage(intl, 'arbeidsforhold.selvstendig.endringAvNæringsinntektInformasjon.forklaring')}
                    required={true}
                />
            </Block>
        </>
    );
};

export default injectIntl(VarigEndringAvNæringsinntekt);
