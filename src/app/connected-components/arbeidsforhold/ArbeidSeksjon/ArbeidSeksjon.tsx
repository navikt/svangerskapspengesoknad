import React, { ComponentClass, FunctionComponent, StatelessComponent, useState } from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { connect as formConnect, FieldArray } from 'formik';
import get from 'lodash/get';

import { FormikProps } from 'app/types/Formik';
import { Knapp } from 'nav-frontend-knapper';
import Block from 'common/components/block/Block';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import Modal from 'nav-frontend-modal';
import getMessage from 'common/util/i18nUtils';
import List from 'common/components/list/List';
import { UferdigSøknad } from 'app/types/Søknad';
import BEMHelper from 'common/util/bem';

import { AnnenInntekt } from 'app/types/AnnenInntekt';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import './arbeidSeksjon.less';

export interface ModalFormProps<T> {
    element?: T;
    endre: boolean;
    onAdd: (element: T) => void;
    onCancel: () => void;
}

export interface ModalSummaryProps<T> {
    element: T;
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText?: string;
    deleteButtonAriaText?: string;
    intl: InjectedIntl;
}

interface OwnProps<T> {
    name: string;
    listName: string;
    legend: string;
    labels?: {
        ja: string;
        nei: string;
    };
    buttonLabel: string;
    infoboksTekst?: string | React.ReactNode;
    summaryListTitle?: {
        title: string;
        info?: string;
    };
    summaryListElementComponent: StatelessComponent<ModalSummaryProps<T>>;
    formComponent: ComponentClass<ModalFormProps<T>>;
}

type OuterProps = OwnProps<any> & InjectedIntlProps;
type Props = OuterProps & FormikProps;

const cls = BEMHelper('arbeidSeksjon');

const Arbeidsforholdseksjon: FunctionComponent<Props> = (props: Props) => {
    const { formik, name, listName, legend, labels, buttonLabel, summaryListTitle, infoboksTekst, intl } = props;
    const visLeggTilKnapp = get(formik.values, name) === true;

    const elementer: any[] = get(formik.values, listName, []);

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
            <Block margin="none">
                <JaNeiSpørsmål
                    twoColumns={true}
                    name={name}
                    legend={legend}
                    labels={labels}
                    infoboksTekst={infoboksTekst}
                />
            </Block>

            <FieldArray
                name={listName}
                render={({ push, replace, remove }) => {
                    return (
                        <div className={cls.block}>
                            <Block
                                margin="none"
                                visible={elementer.length > 0 && visLeggTilKnapp}
                                header={summaryListTitle}>
                                <List
                                    data={elementer}
                                    renderElement={(element, index: number) => {
                                        return (
                                            <props.summaryListElementComponent
                                                key={element + index}
                                                intl={intl}
                                                element={element}
                                                onEdit={openModalForEditing(index)}
                                                onDelete={() => {
                                                    remove(index);
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </Block>
                            <Block visible={visLeggTilKnapp} marginTop="s" margin="none">
                                <Knapp
                                    className={cls.element('leggTil')}
                                    onClick={openModalForAdding}
                                    htmlType="button">
                                    {buttonLabel}
                                </Knapp>
                            </Block>

                            <Modal
                                closeButton={true}
                                isOpen={modalIsOpen}
                                contentLabel={getMessage(intl, `utenlandsopphold.modal.ariaLabel`)}
                                onRequestClose={() => toggleModal(false)}>
                                <props.formComponent
                                    endre={endre}
                                    element={endre ? elementer[currentIndex] : undefined}
                                    onCancel={() => toggleModal(false)}
                                    onAdd={(arbeidsforhold: Næring | AnnenInntekt) => {
                                        endre ? replace(currentIndex, arbeidsforhold) : push(arbeidsforhold);
                                        toggleModal(false);
                                    }}
                                />
                            </Modal>
                        </div>
                    );
                }}
            />
        </>
    );
};

export default injectIntl(formConnect<OuterProps, UferdigSøknad>(Arbeidsforholdseksjon));
