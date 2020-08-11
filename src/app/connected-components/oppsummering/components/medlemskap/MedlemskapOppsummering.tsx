import React, { FunctionComponent, useMemo } from 'react';
import moment from 'moment';
import { FormattedMessage, FormattedHTMLMessage, injectIntl, InjectedIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { guid } from 'nav-frontend-js-utils';
import getCountries, { Countries, getContryName } from 'app/utils/getCountries';

interface Props {
    iNorgeNeste12Mnd: boolean;
    iNorgeSiste12Mnd: boolean;
    tidligereOpphold: Utenlandsopphold[];
    senereOpphold: Utenlandsopphold[];
    intl: InjectedIntl;
}

const getTidligereOppholdText = (tidligereOpphold: Utenlandsopphold[], countries: Countries) => {
    return tidligereOpphold.map((tidlOpphold: Utenlandsopphold) => {
        return (
            <div key={guid()}>
                <FormattedHTMLMessage
                    id="oppsummering.medlemskap.iNorgeSiste12Måneder.nei"
                    values={{
                        land: getContryName(countries, tidlOpphold.land),
                        startDato: moment(tidlOpphold.tidsperiode.fom).format('dddd Do MMMM YYYY'),
                        sluttDato: moment(tidlOpphold.tidsperiode.tom).format('dddd Do MMMM YYYY'),
                    }}
                />
            </div>
        );
    });
};

const getSenereOppholdText = (senereOpphold: Utenlandsopphold[], countries: Countries) => {
    return senereOpphold.map((senOpphold: Utenlandsopphold) => {
        return (
            <div key={guid()}>
                <FormattedHTMLMessage
                    id="oppsummering.medlemskap.iNorgeNeste12Måneder.nei"
                    values={{
                        land: getContryName(countries, senOpphold.land),
                        startDato: moment(senOpphold.tidsperiode.fom).format('dddd Do MMMM YYYY'),
                        sluttDato: moment(senOpphold.tidsperiode.tom).format('dddd Do MMMM YYYY'),
                    }}
                />
            </div>
        );
    });
};

const MedlemskapOppsummering: FunctionComponent<Props> = ({
    iNorgeNeste12Mnd,
    iNorgeSiste12Mnd,
    tidligereOpphold,
    senereOpphold,
    intl,
}) => {
    const countries = useMemo(() => getCountries(true, false, intl), [intl]);

    return (
        <>
            <Block margin="xxs">
                {iNorgeSiste12Mnd ? (
                    <FormattedMessage id={'oppsummering.medlemskap.iNorgeSiste12Måneder.ja'} />
                ) : (
                    getTidligereOppholdText(tidligereOpphold, countries)
                )}
            </Block>
            <Block margin="xxs">
                {iNorgeNeste12Mnd ? (
                    <FormattedMessage id={'oppsummering.medlemskap.iNorgeNeste12Måneder.ja'} />
                ) : (
                    getSenereOppholdText(senereOpphold, countries)
                )}
            </Block>
        </>
    );
};

export default injectIntl(MedlemskapOppsummering);
