import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Block from 'common/components/block/Block';
import InputField from 'app/formik/wrappers/InputField';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';

interface NæringsrelasjonBolkProps {
    values: Næring;
    type: 'revisor' | 'regnskapsfører';
}

type Props = NæringsrelasjonBolkProps & InjectedIntlProps;

const Næringsrelasjon: React.FunctionComponent<Props> = (props: Props) => {
    const { values, type, intl } = props;
    const næringsrelasjon = values[type] || {};

    const visKomponent = {
        telefonnummer: næringsrelasjon.navn !== undefined && næringsrelasjon.navn !== '',
        erNærVennEllerFamilie: næringsrelasjon.telefonnummer !== undefined && næringsrelasjon.telefonnummer !== ''
    };

    return (
        <>
            <Block>
                <InputField
                    name={`${type}.navn`}
                    label={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.${type}.navn`)}
                />
            </Block>
            <Block visible={visKomponent.telefonnummer}>
                <InputField
                    name={`${type}.telefonnummer`}
                    label={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.${type}.tlfnr`)}
                />
            </Block>
            <Block visible={visKomponent.erNærVennEllerFamilie}>
                <JaNeiSpørsmål
                    name={`${type}.erNærVennEllerFamilie`}
                    legend={getMessage(intl, `arbeidsforhold.selvstendig.næringsrelasjon.erNærVennEllerFamilie`)}
                />
            </Block>
        </>
    );
};
export default injectIntl(Næringsrelasjon);
