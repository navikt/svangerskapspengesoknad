import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    iNorgeNeste12Mnd: boolean;
    iNorgeSiste12Mnd: boolean;
}

const MedlemskapOppsummering: FunctionComponent<Props> = ({ iNorgeNeste12Mnd, iNorgeSiste12Mnd }) => {
    return (
        <>
            <div className="textWrapper">
                <FormattedMessage
                    id={
                        iNorgeNeste12Mnd
                            ? 'oppsummering.medlemskap.senereOpphold.ja'
                            : 'oppsummering.medlemskap.senereOpphold.nei'
                    }
                />
            </div>
            <div className="textWrapper">
                <FormattedMessage
                    id={
                        iNorgeSiste12Mnd
                            ? 'oppsummering.medlemskap.tidligereOpphold.ja'
                            : 'oppsummering.medlemskap.tidligereOpphold.nei'
                    }
                />
            </div>
        </>
    );
};

export default MedlemskapOppsummering;
