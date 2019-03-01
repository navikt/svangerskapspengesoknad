import React from 'react';
import classnames from 'classnames';

import './veilederinfo.less';
import Veileder, { Ansiktstype } from '../veileder/Veileder';

type Infotype = 'info' | 'advarsel' | 'feil';

export interface VeilederInfoProps {
    visVeileder?: boolean;
    stil?: 'kompakt' | 'normal' | 'kunTekst';
    type?: Infotype;
    maxWidth?: '30' | '45';
}

const getAnsiktFromType = (type: Infotype): Ansiktstype => {
    switch (type) {
        case 'advarsel':
            return 'undrende';
        case 'feil':
            return 'skeptisk';
        default:
            return 'glad';
    }
};

const Veilederinfo: React.StatelessComponent<VeilederInfoProps> = ({
    visVeileder = true,
    stil = 'normal',
    type = 'info',
    maxWidth,
    children
}) => {
    return (
        <div
            className={classnames(
                'veilederinfo',
                `veilederinfo--${stil}`,
                `veilederinfo--${type}`,
                maxWidth ? `veilederinfo--maxWidth-${maxWidth}` : null,
                {
                    'veilederinfo--utenVeileder': !visVeileder
                }
            )}>
            {visVeileder && (
                <span className="veilederinfo__veileder" role="presentation" aria-hidden={true}>
                    <Veileder farge="lilla" ansikt={getAnsiktFromType(type)} stil="kompakt" />
                </span>
            )}
            <div className={classnames('veilederinfo__innhold', `veilederinfo__innhold--${type}`, 'typo-normal')}>
                {children}
            </div>
        </div>
    );
};

export default Veilederinfo;
