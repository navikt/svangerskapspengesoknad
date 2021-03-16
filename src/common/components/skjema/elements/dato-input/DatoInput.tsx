import React from 'react';
import SkjemaInputElement from '../skjema-input-element/SkjemaInputElement';
import { Feil } from '../skjema-input-element/types';
import { useIntl } from 'react-intl';
import AriaText from 'common/components/aria/AriaText';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/elements/dato-input/datoInputDescription';
import moment from 'moment';
import { Avgrensninger, Tidsperiode } from 'common/types';
import BEMHelper from 'common/util/bem';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import { Datepicker, DatepickerLimitations } from 'nav-datovelger';
import { DatepickerProps } from 'nav-datovelger/lib/Datepicker';

import './datoInput.less';

export interface DatoInputProps extends Omit<DatepickerProps, 'onChange' | 'input'> {
    id: string;
    name: string;
    label: React.ReactNode;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    onChange: (dato?: Date) => void;
    datoAvgrensinger?: Avgrensninger;
}

export type Props = DatoInputProps;

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatepickerLimitations => {
    return {
        maxDate: dateToISOFormattedDateString(avgrensinger.maksDato),
        minDate: dateToISOFormattedDateString(avgrensinger.minDato),
        weekendsNotSelectable: avgrensinger.helgedagerIkkeTillatt,
        invalidDateRanges:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                from: dateToISOFormattedDateString(t.fom)!,
                to: dateToISOFormattedDateString(t.tom)!,
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
    calendarSettings,
    name,
    limitations,
    dato,
    datoAvgrensinger,
    ...rest
}) => {
    const intl = useIntl();
    const avgrensningerTekst = limitations ? getAvgrensningerDescriptionForInput(limitations) : undefined;
    const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;

    return (
        <SkjemaInputElement id={id} feil={feil} label={label}>
            <div className={bem.block}>
                <div className={bem.element('datovelger')}>
                    <Datepicker
                        {...rest}
                        value={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                        locale={intl.locale as any}
                        calendarSettings={calendarSettings}
                        inputProps={{
                            placeholder: 'dd.mm.åååå',
                            name,
                            'aria-describedby': ariaDescriptionId,
                        }}
                        onChange={(datoString: string) =>
                            onChange(datoString && datoString !== 'Invalid date' ? new Date(datoString) : undefined)
                        }
                        limitations={datoAvgrensinger ? parseAvgrensinger(datoAvgrensinger) : undefined}
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
