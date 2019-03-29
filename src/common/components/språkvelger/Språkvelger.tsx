import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Språkkode } from '../../intl/types';
import moment from 'moment';

import './språkvelger.less';

interface Props {
    kode: Språkkode;
    setSpråkkode: (kode: Språkkode) => void;
}

const Språkvelger: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, kode, setSpråkkode }) => {
    const setLanguage = (kode: Språkkode) => {
        moment.locale(kode);
        setSpråkkode(kode);
    };

    return (
        <div className="sprakvelger">
            <a
                className="lenke"
                onClick={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    kode === 'nb' ? setLanguage('nn') : setLanguage('nb');
                }}
                href="#">
                {intl.formatMessage({
                    id: 'komponent.språkvelger.endreMålform',
                })}
            </a>
        </div>
    );
};
export default injectIntl(Språkvelger);
