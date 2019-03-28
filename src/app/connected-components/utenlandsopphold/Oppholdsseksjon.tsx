import React, { FunctionComponent, useState } from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { connect as formConnect, FieldArray } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import get from 'lodash/get';
import Modal from 'nav-frontend-modal';

import { FormikProps } from 'app/types/Formik';
import { UferdigSøknad } from 'app/types/Søknad';
import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import List from 'common/components/list/List';
import OppholdListElement from './OppholdListElement';
import Oppholdsvalg from './Oppholdsvalg';

interface OwnProps {
    name: string;
    land: string;
    type: Oppholdstype;
    legend: string;
    labels: {
        ja: string;
        nei: string;
    };
}

type OuterProps = OwnProps & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Oppholdsspørsmål: FunctionComponent<Props> = (props) => {
    const { formik, name, land, legend, labels, type, intl } = props;
    const visLandvelger = get(formik.values, name) === false;

    const alleOpphold: Utenlandsopphold[] = get(formik.values, land);

    const [modalIsOpen, toggleModal] = useState(false);
    const [currentIndex, selectIndex] = useState(alleOpphold.length);
    const [endreLand, toggleEndring] = useState(false);

    const openModalForAdding = () => {
        toggleEndring(false);
        toggleModal(true);
    };

    const openModalForEditing = (index: number) => () => {
        selectIndex(index);
        toggleEndring(true);
        toggleModal(true);
    };

    return (
        <>
            <Block margin="xs">
                <JaNeiSpørsmål twoColumns name={name} legend={legend} labels={labels} />
            </Block>
            <Block visible={visLandvelger} margin="xs">
                <Knapp onClick={openModalForAdding} htmlType="button">
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
                                            onEdit={openModalForEditing(index)}
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
                                    type={type}
                                    endre={endreLand}
                                    opphold={endreLand ? alleOpphold[currentIndex] : undefined}
                                    onCancel={() => toggleModal(false)}
                                    onAdd={(opphold) => {
                                        endreLand ? replace(currentIndex, opphold) : push(opphold);
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
