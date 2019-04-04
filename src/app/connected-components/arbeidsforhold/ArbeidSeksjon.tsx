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
import { UferdigSøknad } from 'app/types/Søknad';
import OppholdListElement from '../utenlandsopphold/OppholdListElement';
import { ModalFormProps } from './SelvstendigNæringsdrivende/SelvstendigNæringsdrivende';

interface OwnProps<T> {
    name: string;
    listName: string;
    type: any;
    legend: string;
    labels?: {
        ja: string;
        nei: string;
    };
    buttonLabel: string;
    formComponent: React.ComponentClass<ModalFormProps<T>>;
}

type OuterProps = OwnProps<any> & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const Arbeidsforholdseksjon: FunctionComponent<Props> = (props: Props) => {
    const { formik, name, listName, legend, labels, type, buttonLabel, intl } = props;
    const visLandvelger = get(formik.values, name) === true;

    const elementer: any[] = get(formik.values, listName);

    const [currentIndex, selectIndex] = useState(get(elementer, 'length', 0));
    const [modalIsOpen, toggleModal] = useState(false);
    const [endre, toggleEndring] = useState(false);

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
                    <FormattedMessage id={buttonLabel} />
                </Knapp>
            </Block>

            <FieldArray
                name={listName}
                render={({ push, replace, remove }) => {
                    return (
                        <>
                            <Block margin="xs" visible={currentIndex > 0}>
                                <List
                                    data={elementer}
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
                                <props.formComponent
                                    type={type}
                                    endre={endre}
                                    element={endre ? elementer[currentIndex] : undefined}
                                    onCancel={() => toggleModal(false)}
                                    onAdd={(arbeidsforhold: any) => {
                                        endre ? replace(currentIndex, arbeidsforhold) : push(arbeidsforhold);
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

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Arbeidsforholdseksjon));
