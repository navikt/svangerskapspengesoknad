import React, { FunctionComponent } from 'react';
import { connect as formConnect } from 'formik';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import Steg, { StegProps } from 'app/components/steg/Steg';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import Oppholdsseksjon from './Oppholdsseksjon';
import { Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';

type OuterProps = StegProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Utenlandsopphold: FunctionComponent<Props> = ({ formik, intl, ...stegProps }) => {
    const { informasjonOmUtenlandsopphold: opphold } = formik.values;

    const visKomponent = {
        iNorgeNeste12Mnd: opphold.iNorgeSiste12Mnd !== undefined,
        nesteknapp: opphold.iNorgeSiste12Mnd !== undefined && opphold.iNorgeNeste12Mnd !== undefined,
    };

    return (
        <Steg {...stegProps} renderNesteknapp={visKomponent.nesteknapp}>
            <Block>
                <Oppholdsseksjon
                    type={Oppholdstype.TIDLIGERE_OPPHOLD}
                    name="informasjonOmUtenlandsopphold.iNorgeSiste12Mnd"
                    land="informasjonOmUtenlandsopphold.tidligereOpphold"
                    legend={getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.label')}
                    labels={{
                        ja: getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.ja'),
                        nei: getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.nei'),
                    }}
                />
            </Block>
            <Block visible={visKomponent.iNorgeNeste12Mnd}>
                <Oppholdsseksjon
                    type={Oppholdstype.SENERE_OPPHOLD}
                    name="informasjonOmUtenlandsopphold.iNorgeNeste12Mnd"
                    land="informasjonOmUtenlandsopphold.senereOpphold"
                    legend={getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.label')}
                    labels={{
                        ja: getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.ja'),
                        nei: getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.nei'),
                    }}
                />
            </Block>
        </Steg>
    );
};

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Utenlandsopphold));
