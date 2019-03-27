import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { navigateTo } from 'app/utils/navigationUtils';
import { Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import { StepProps } from 'app/components/step/Step';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import FormikStep from 'app/components/formikStep/FormikStep';
import getMessage from 'common/util/i18nUtils';
import Oppholdsseksjon from './Oppholdsseksjon';
import SøknadStep, { StepID } from 'app/types/SøknadStep';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

type Props = OwnProps & StepProps & InjectedIntlProps;

const Utenlandsopphold: FunctionComponent<Props> = (props) => {
    const { step, formikProps, intl, history } = props;
    const { informasjonOmUtenlandsopphold: opphold } = formikProps.values;

    const visKomponent = {
        senereOpphold:
            opphold.iNorgeSiste12Mnd || (opphold.iNorgeSiste12Mnd === false && opphold.tidligereOpphold.length > 0),
        nesteknapp:
            opphold.iNorgeNeste12Mnd || (opphold.iNorgeNeste12Mnd === false && opphold.senereOpphold.length > 0),
    };

    const navigate = () => {
        navigateTo(getSøknadStepPath(StepID.OPPSUMMERING), history);
    };

    return (
        <Applikasjonsside visTittel visSpråkvelger>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={visKomponent.nesteknapp}
                onValidFormSubmit={navigate}
                history={history}>
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
                <Block visible={visKomponent.senereOpphold}>
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
            </FormikStep>
        </Applikasjonsside>
    );
};

export default injectIntl(Utenlandsopphold);
