import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import { CustomFormikProps } from 'app/types/Formik';
import { getData } from 'app/utils/fromFetchState';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { HistoryProps } from 'app/redux/types/common';
import { Hovedknapp } from 'nav-frontend-knapper';
import { navigateTo } from 'app/utils/navigationUtils';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { State } from 'app/redux/store';
import { StepID } from 'app/types/SøknadStep';
import Applikasjonsside from 'app/connected-components/applikasjonsside/Applikasjonsside';
import BekreftCheckboksPanel from 'app/formik/wrappers/BekreftCheckboksPanel';
import BEMHelper from 'common/util/bem';
import DinePersonopplysningerModal from '../../components/dine-personopplysninger-modal/DinePersonopplysningerModal';
import DinePlikterModal from '../../components/dine-plikter-modal/DinePlikterModal';
import FetchState from 'app/types/FetchState';
import getMessage from 'common/util/i18nUtils';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import useFormikSubmit from 'app/hooks/useFormikSubmit';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';
import './intro.less';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import DocumentIkon from 'app/icons/DocumentIkon';

const cls = BEMHelper('intro');

interface OwnProps {
    søkerinfo: FetchState<Søkerinfo>;
    formik: CustomFormikProps;
}

type Props = OwnProps & HistoryProps;

const Intro: FunctionComponent<Props> = ({ søkerinfo, formik, history }) => {
    const intl = useIntl();
    const søker = getData(søkerinfo, {}).søker;
    const { values, isSubmitting, isValid } = formik;
    const disableNextButton = !values.harGodkjentVilkår;

    useFormikSubmit(isSubmitting, isValid, () => {
        navigateTo(getSøknadStepPath(StepID.TERMIN), history);
    });

    const [dinePlikterIsOpen, toggleDinePlikter] = useState(false);
    const [dinePersonopplysningerIsOpen, toggleDinePersonopplysninger] = useState(false);

    return (
        <Applikasjonsside visSpråkvelger={true}>
            <VeilederMedSnakkeboble
                dialog={{
                    title: getMessage(intl, 'intro.bobletittel', {
                        name: søker.fornavn,
                    }),
                    text: getMessage(intl, 'intro.bobletekst'),
                }}
            />
            <form className={cls.block} onSubmit={formik.handleSubmit}>
                <Innholdstittel className="blokk-xs">
                    <FormattedMessage id="intro.tittel" />
                </Innholdstittel>
                <Veilederinfo CustomIcon={DocumentIkon}>
                    <FormattedMessage
                        id="intro.ingress"
                        values={{
                            a: (msg: any) => (
                                <a
                                    className="lenke"
                                    rel="noopener noreferrer"
                                    href="https://familie.nav.no/om-svangerskapspenger#slik-soker-du"
                                    target="_blank"
                                >
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                </Veilederinfo>
                <BekreftCheckboksPanel
                    className="blokk-m"
                    name="harGodkjentVilkår"
                    label={getMessage(intl, 'intro.godkjennVilkår.bekreft')}
                >
                    <FormattedMessage
                        id="intro.godkjennVilkår.label"
                        values={{
                            link: (
                                <a
                                    className="lenke"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleDinePlikter(true);
                                    }}
                                >
                                    <FormattedMessage id="intro.dinePlikter" />
                                </a>
                            ),
                        }}
                    />
                </BekreftCheckboksPanel>
                <Hovedknapp htmlType="submit" disabled={disableNextButton} className="blokk-m">
                    <FormattedMessage id="intro.begynnSøknad.knapp" />
                </Hovedknapp>
                <Normaltekst className="velkommen__personopplysningerLink">
                    <a
                        className="lenke"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleDinePersonopplysninger(true);
                        }}
                    >
                        <FormattedMessage id="intro.lesMerOmPersonopplysninger" />
                    </a>
                </Normaltekst>
                <DinePlikterModal isOpen={dinePlikterIsOpen} onRequestClose={() => toggleDinePlikter(false)} />
                <DinePersonopplysningerModal
                    isOpen={dinePersonopplysningerIsOpen}
                    onRequestClose={() => toggleDinePersonopplysninger(false)}
                />
            </form>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
});

export default connect(mapStateToProps)(Intro);
