import React, { FunctionComponent, useState } from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { connect as formConnect, FieldArray } from 'formik';
import get from 'lodash/get';

import { FormikProps } from 'app/types/Formik';
import { Knapp } from 'nav-frontend-knapper';
import Block from 'common/components/block/Block';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import Modal from 'nav-frontend-modal';
import getMessage from 'common/util/i18nUtils';
import { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import List from 'common/components/list/List';
import OppholdListElement from './OppholdListElement';
import { UferdigSøknad } from 'app/types/Søknad';
import Oppholdsvalg from './Oppholdsvalg';

interface OwnProps {
    name: string;
    land: string;
    legend: string;
    labels: {
        ja: string;
        nei: string;
    };
}

type OuterProps = OwnProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Oppholdsspørsmål: FunctionComponent<Props> = (props) => {
    const { formik, name, land, legend, labels, intl } = props;
    const visLandvelger = get(formik.values, name) === false;

    const alleOpphold: Utenlandsopphold[] = get(formik.values, land);

    const [modalIsOpen, toggleModal] = useState(false);
    const [currentIndex, selectIndex] = useState(alleOpphold.length);
    const [erNyttLand, setErNyttLand] = useState(true);

    return (
        <>
            <Block margin="xs">
                <JaNeiSpørsmål twoColumns name={name} legend={legend} labels={labels} />
            </Block>
            <Block visible={visLandvelger} margin="xs">
                <Knapp
                    onClick={() => {
                        setErNyttLand(true);
                        toggleModal(true);
                    }}
                    htmlType="button">
                    <FormattedMessage id="utenlandsopphold.leggTilLand" />
                </Knapp>
            </Block>

            <FieldArray
                name={land}
                render={({ push, replace, remove }) => {
                    return (
                        <>
                            <Block margin="xs" visible={alleOpphold.length > 0}>
                                <List
                                    data={alleOpphold}
                                    renderElement={(oppholdToRender: Utenlandsopphold, index: number) => (
                                        <OppholdListElement
                                            key={oppholdToRender.land + index}
                                            opphold={oppholdToRender}
                                            onEdit={() => {
                                                selectIndex(index);
                                                setErNyttLand(false);
                                                toggleModal(true);
                                            }}
                                            onDelete={() => {
                                                remove(index);
                                            }}
                                        />
                                    )}
                                />
                            </Block>
                            <Modal
                                closeButton
                                isOpen={modalIsOpen}
                                contentLabel={getMessage(intl, `utenlandsopphold.modal.ariaLabel`)}
                                onRequestClose={() => toggleModal(false)}>
                                <Oppholdsvalg
                                    title={getMessage(
                                        intl,
                                        `utenlandsopphold.modal.tittel${!erNyttLand ? '.endre' : ''}`
                                    )}
                                    opphold={alleOpphold[currentIndex]}
                                    onCancel={() => toggleModal(false)}
                                    onAdd={(opphold) => {
                                        erNyttLand ? push(opphold) : replace(currentIndex, opphold);
                                        toggleModal(false);
                                    }}
                                />
                            </Modal>
                        </>
                    );
                }}
            />
        </>
    );
};

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Oppholdsspørsmål));
