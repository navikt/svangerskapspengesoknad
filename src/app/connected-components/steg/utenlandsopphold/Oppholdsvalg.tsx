import React, { FunctionComponent, useState } from 'react';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Select } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { SelectChangeEvent } from 'app/types/events';
import { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import getCountries from 'app/utils/getCountries';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import VelgTidsperiode from './VelgTidsperiode';

interface Props {
    title: string;
    opphold?: Utenlandsopphold;
    onAdd: (opphold: any) => void;
    onCancel: () => void;
    intl: InjectedIntl;
}

const Oppholdvalg: FunctionComponent<Props & InjectedIntlProps> = (props) => {
    const {
        title,
        opphold = {
            land: '',
            periode: {},
        },
        onAdd,
        onCancel,
        intl,
    } = props;

    // TODO: Replace state with Formik
    const [currentOpphold, changeOpphold] = useState(opphold);

    return (
        <>
            <Block>
                <Undertittel>{title}</Undertittel>
            </Block>
            <Block margin="xs">
                <Block>
                    <Select
                        name="utenlandsopphold.landsvelger"
                        label={getMessage(intl, 'utenlandsopphold.land.label')}
                        value={currentOpphold.land}
                        onChange={(e: SelectChangeEvent) => {
                            changeOpphold({
                                ...currentOpphold,
                                land: e.target.value,
                            });
                        }}>
                        <option value="" />
                        {getCountries(false, intl).map((countryOption: string[]) => {
                            const [countryCode, countryName] = countryOption;
                            return (
                                <option key={countryCode} value={countryCode}>
                                    {countryName}
                                </option>
                            );
                        })}
                    </Select>
                </Block>
                <Block margin="xs">
                    <VelgTidsperiode
                        tidsperiode={currentOpphold.periode}
                        onChange={(periode: TidsperiodeMedValgfriSluttdato) => {
                            changeOpphold({
                                ...currentOpphold,
                                periode,
                            });
                        }}
                    />
                </Block>
                <Knapp onClick={onCancel}>
                    <FormattedMessage id="utenlandsopphold.land.avbryt" />
                </Knapp>
                <Hovedknapp
                    onClick={() => {
                        onAdd(currentOpphold);
                    }}>
                    <FormattedMessage id="utenlandsopphold.land.leggTil" />
                </Hovedknapp>
            </Block>
        </>
    );
};

export default injectIntl(Oppholdvalg);
