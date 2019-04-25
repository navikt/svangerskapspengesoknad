import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import BEMHelper from 'common/util/bem';

interface LabelMedInfoboxProps {
    label: string | React.ReactNode;
    infoBox?: string | React.ReactNode;
}

const LabelMedInfobox: React.StatelessComponent<LabelMedInfoboxProps> = ({ label, infoBox }) => {
    const cls = BEMHelper('block');
    return (
        <div className={cls.element('heading', `stil-normal'}`)}>
            <h1 className={`typo-element ${cls.element('title')}`}>{label}</h1>
            {infoBox && <Infoboks tekst={infoBox} contentFullWidth={true} />}
        </div>
    );
};
export default LabelMedInfobox;
