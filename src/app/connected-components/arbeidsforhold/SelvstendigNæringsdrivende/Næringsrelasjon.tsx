import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Block from 'common/components/block/Block';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';

interface NæringsrelasjonBolkProps {
    type: 'revisor' | 'regnskapsfører';
}

type Props = NæringsrelasjonBolkProps & InjectedIntlProps;

const Næringsrelasjon: React.FunctionComponent<Props> = (props: Props) => {
    const { type, intl } = props;

    const visKomponent = {
        telefonnr: true,
        erNærVennEllerFamilie: true,
    };

    return (
        <>
            <Block>
                <InputField
                    name={`${type}.navn`}
                    label={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.${type}.navn`)}
                />
            </Block>
            <Block visible={visKomponent.telefonnr}>
                <InputField
                    name={`${type}.telefonnr`}
                    label={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.${type}.tlfnr`)}
                />
            </Block>
            <Block visible={visKomponent.erNærVennEllerFamilie}>
                <JaNeiSpørsmål
                    name={`${type}.erNærVennEllerFamilie`}
                    legend={`arbeidsforhold.selvstendig.næringsrelasjon.erNærVennEllerFamilie`}
                />
            </Block>
        </>
    );
};
export default injectIntl(Næringsrelasjon);
