import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps, FormattedHTMLMessage, InjectedIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import moment from 'moment';

import { FetchStatus } from 'app/types/FetchState';
import { CustomFormikProps } from 'app/types/Formik';
import { mergeSøknadsgrunnlagIntoTilrettelegging } from 'app/utils/tilretteleggingUtils';
import { State } from 'app/redux/store';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import VelgSøknadsgrunnlag from 'app/formik/wrappers/VelgSøknadsgrunnlag';
import Arbeidsforholdseksjon from './ArbeidSeksjon/ArbeidSeksjon';
import SelvstendigNæringsdrivende from './SelvstendigNæringsdrivende/SelvstendigNæringsdrivende';
import AndreInntekter from './AndreInntekter/AndreInntekter';
import FrilansSpørsmål from './Frilans/FrilansSpørsmål';

import FormikStep from 'app/components/formik-step/FormikStep';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import { StepProps } from 'app/components/step/Step';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { navigateTo } from 'app/utils/navigationUtils';

import SelvstendigListElement from './SelvstendigNæringsdrivende/SelvstendigListElement';
import AndreInntekterListElement from './AndreInntekter/AnnenInntektListElement';
import { cleanupSøker } from './utils/cleanup';
import { mapArbeidsToSøknadsgrunnlag } from './utils/søknadsgrunnlagMapper';
import Søker from 'app/types/Søker';

import './arbeidsforhold.less';

const cls = BEMHelper('arbeidsforhold');

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

interface ConnectProps {
    arbeidsforhold: Arbeidsforhold[];
}

type Props = OwnProps & StepProps & ConnectProps & InjectedIntlProps;

const Arbeidsforhold: FunctionComponent<Props> = (props: Props) => {
    const { step, formikProps, arbeidsforhold, intl, history } = props;
    const { values, setFieldValue } = formikProps;
    const { søker, søknadsgrunnlag } = values;

    const harValgtMinstEttGrunnlag: boolean = søknadsgrunnlag.length > 0;

    const {
        harJobbetSomFrilansSiste10Mnd,
        frilansInformasjon,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        selvstendigNæringsdrivendeInformasjon,
        harHattAnnenInntektSiste10Mnd,
        andreInntekterSiste10Mnd = []
    } = cleanupSøker(søker);

    const visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon =
        harJobbetSomFrilansSiste10Mnd === false ||
        (frilansInformasjon !== undefined && frilansInformasjon.driverFosterhjem !== undefined);

    const visharHattAnnenInntektSiste10MndSeksjon =
        (visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon &&
            ((selvstendigNæringsdrivendeInformasjon && selvstendigNæringsdrivendeInformasjon.length) || 0) > 0) ||
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false ||
        harHattAnnenInntektSiste10Mnd !== undefined;

    const visSøknadnsgrunnlagValg =
        visharHattAnnenInntektSiste10MndSeksjon &&
        ((harHattAnnenInntektSiste10Mnd === true && andreInntekterSiste10Mnd.length! > 0) ||
            harHattAnnenInntektSiste10Mnd === false) &&
        mapArbeidsToSøknadsgrunnlag(cleanupSøker(values.søker) as Søker, arbeidsforhold).length > 0;

    const visIngenArbeidsforholdVeileder =
        arbeidsforhold.length === 0 &&
        harJobbetSomFrilansSiste10Mnd === false &&
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false &&
        harHattAnnenInntektSiste10Mnd === false;

    const prepareTilrettelegging = () => {
        setFieldValue(
            'tilrettelegging',
            mergeSøknadsgrunnlagIntoTilrettelegging(values.søknadsgrunnlag, values.tilrettelegging)
        );
    };

    const cleanupArbeidsforhold = () => {
        setFieldValue('søker', cleanupSøker(søker));
    };

    const navigate = () => {
        cleanupArbeidsforhold();
        prepareTilrettelegging();
        const pathToFirstTilrettelegging = getSøknadStepPath(StepID.TILRETTELEGGING, values.søknadsgrunnlag[0].id);
        navigateTo(pathToFirstTilrettelegging, history);
    };

    return (
        <Applikasjonsside visTittel={true} visSpråkvelger={true}>
            <FormikStep
                step={step}
                className={cls.block}
                formikProps={formikProps}
                showNesteknapp={harValgtMinstEttGrunnlag}
                onValidFormSubmit={navigate}
                history={history}>
                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.label')
                    }}>
                    <Normaltekst>{getMessage(intl, 'arbeidsforhold.utbetalingerFraNAV.text')}</Normaltekst>
                </Block>

                <Block
                    header={{
                        title: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.label'),
                        info: getMessage(intl, 'arbeidsforhold.dineArbeidsforhold.infotekst')
                    }}>
                    <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
                </Block>

                <Block margin="s">
                    <Veilederinfo type="info" stil="kompakt">
                        {getMessage(intl, 'arbeidsforhold.veileder.inntektsmelding', {
                            // TODO: Hva er riktig dato her?
                            datoTidligst: moment().format('DD.MM.YYYY')
                        })}
                    </Veilederinfo>
                </Block>

                <FrilansSpørsmål formikProps={formikProps} />

                <Block visible={visHarJobbetSomSelvstendigNæringsdrivendeSiste10MndSeksjon}>
                    <Arbeidsforholdseksjon
                        name="søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
                        listName="søker.selvstendigNæringsdrivendeInformasjon"
                        legend={getMessage(intl, 'arbeidsforhold.selvstendig.erSelvstendigNæringsdrivende')}
                        buttonLabel={getMessage(intl, 'leggtil')}
                        infoboksTekst={getMessage(intl, 'arbeidsforhold.selvstendig.infoboxTekst')}
                        summaryListTitle={{ title: getMessage(intl, 'arbeidsforhold.selvstendig.dineVirksomheter') }}
                        summaryListElementComponent={SelvstendigListElement}
                        formComponent={SelvstendigNæringsdrivende}
                    />
                </Block>

                <Block visible={visharHattAnnenInntektSiste10MndSeksjon}>
                    <Arbeidsforholdseksjon
                        name="søker.harHattAnnenInntektSiste10Mnd"
                        listName="søker.andreInntekterSiste10Mnd"
                        legend={getMessage(intl, 'arbeidsforhold.andreInntekter')}
                        buttonLabel={getMessage(intl, 'leggtil')}
                        infoboksTekst={<AnnenInntektSiste10MndHjelpeTekst intl={intl} />}
                        summaryListElementComponent={AndreInntekterListElement}
                        formComponent={AndreInntekter}
                    />
                </Block>

                <Block visible={visSøknadnsgrunnlagValg} margin="l">
                    <VelgSøknadsgrunnlag
                        name="søknadsgrunnlag"
                        label={getMessage(intl, 'arbeidsforhold.grunnlag.label')}
                        options={mapArbeidsToSøknadsgrunnlag(cleanupSøker(values.søker) as Søker, arbeidsforhold)}
                    />
                </Block>
                <Block visible={visIngenArbeidsforholdVeileder}>
                    <Veilederinfo type="advarsel">
                        <FormattedHTMLMessage id="arbeidsforhold.veileder.ingenArbeidsforhold" />
                    </Veilederinfo>
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

const mapStateToProps = (state: State) => {
    const { søkerinfo } = state.api;

    return {
        arbeidsforhold: søkerinfo.status === FetchStatus.SUCCESS ? søkerinfo.data.arbeidsforhold : []
    };
};

export default injectIntl(connect(mapStateToProps)(Arbeidsforhold));

const AnnenInntektSiste10MndHjelpeTekst = ({ intl }: { intl: InjectedIntl }) => {
    return (
        <div>
            <div>{getMessage(intl, 'annenInntekt.infoboksTekst.overskrift')}</div>
            <ul>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktEn')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktTo')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktTre')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktFire')}</li>
                <li>{getMessage(intl, 'annenInntekt.infoboksTekst.punktFem')}</li>
            </ul>
        </div>
    );
};
