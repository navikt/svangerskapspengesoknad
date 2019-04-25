import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import BEMHelper from 'common/util/bem';

import './labelMedInfobox.less';

interface LabelMedInfoboxProps {
    title: string | React.ReactNode;
    info?: string | React.ReactNode;
    stil?: 'normal' | 'seksjon';
}

const LabelMedInfobox: React.StatelessComponent<LabelMedInfoboxProps> = ({ title, info, stil }) => {
    const cls = BEMHelper('labelMedInfobox');
    return (
        <div className={cls.element('heading', `stil-${stil || 'normal'}`)}>
            <h1 className={`typo-element ${cls.element('title')}`}>{title}</h1>
            {info && <Infoboks tekst={info} contentFullWidth={true} />}
        </div>
    );
};
export default LabelMedInfobox;
