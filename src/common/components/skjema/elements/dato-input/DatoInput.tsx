import React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import { useIntl } from 'react-intl';
import Datovelger, { DatovelgerProps } from 'nav-datovelger/lib/Datovelger';
import AriaText from 'common/components/aria/AriaText';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/elements/dato-input/datoInputDescription';
import moment from 'moment';
import { Avgrensninger, Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import './datoInput.less';

export interface DatoInputProps extends Omit<DatovelgerProps, 'onChange' | 'input'> {
    name: string;
    label: React.ReactNode;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    onChange: (dato?: Date) => void;
    datoAvgrensinger?: Avgrensninger;
}

export type Props = DatoInputProps;

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatovelgerAvgrensninger => {
    return {
        maksDato: dateToISOFormattedDateString(avgrensinger.maksDato),
        minDato: dateToISOFormattedDateString(avgrensinger.minDato),
        helgedagerIkkeTillatt: avgrensinger.helgedagerIkkeTillatt,
        ugyldigeTidsperioder:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                fom: dateToISOFormattedDateString(t.fom)!,
                tom: dateToISOFormattedDateString(t.tom)!,
            })),
    };
};

const bem = BEMHelper('datoInput');

const DatoInput: React.FunctionComponent<Props> = ({
    id,
    label,
    postfix,
    feil,
    onChange,
    kalender,
    name,
    avgrensninger,
    dato,
    datoAvgrensinger,
    ...rest
}) => {
    const intl = useIntl();
    const avgrensningerTekst = avgrensninger ? getAvgrensningerDescriptionForInput(avgrensninger) : undefined;
    const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;

    return (
        <SkjemaInputElement id={id} feil={feil} label={label}>
            <div className={bem.block}>
                <div className={bem.element('datovelger')}>
                    <Datovelger
                        {...rest}
                        valgtDato={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                        id={id ? id : name}
                        locale={intl.locale}
                        kalender={kalender}
                        input={{
                            id,
                            placeholder: 'dd.mm.åååå',
                            name,
                            ariaDescribedby: ariaDescriptionId,
                        }}
                        onChange={(datoString: string) =>
                            onChange(datoString && datoString !== 'Invalid date' ? new Date(datoString) : undefined)
                        }
                        avgrensninger={datoAvgrensinger ? parseAvgrensinger(datoAvgrensinger) : undefined}
                    />
                    {ariaDescriptionId && (
                        <AriaText id={ariaDescriptionId} aria-role="presentation" aria-hidden="true">
                            {avgrensningerTekst}
                        </AriaText>
                    )}
                </div>
                {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
            </div>
        </SkjemaInputElement>
    );
};
export default DatoInput;
