import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';

interface Props {
    iNorgeNeste12Mnd: boolean;
    iNorgeSiste12Mnd: boolean;
}

const MedlemskapOppsummering: FunctionComponent<Props> = ({ iNorgeNeste12Mnd, iNorgeSiste12Mnd }) => {
    return (
        <>
            <Block margin="xxs">
                <FormattedMessage
                    id={
                        iNorgeSiste12Mnd
                            ? 'oppsummering.medlemskap.tidligereOpphold.ja'
                            : 'oppsummering.medlemskap.tidligereOpphold.nei'
                    }
                />
            </Block>
            <Block margin="xxs">
                <FormattedMessage
                    id={
                        iNorgeNeste12Mnd
                            ? 'oppsummering.medlemskap.senereOpphold.ja'
                            : 'oppsummering.medlemskap.senereOpphold.nei'
                    }
                />
            </Block>
        </>
    );
};

export default MedlemskapOppsummering;
