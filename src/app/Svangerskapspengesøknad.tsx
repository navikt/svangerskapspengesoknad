import * as React from 'react';
import { Tilretteleggingstype } from './types/Tilrettelegging';
import * as Api from './api/api';
import Søknad from './types/Søknad';

const mockedSøknad: Søknad = {
    saksnummer: '12345',
    barn: {
        erBarnetFødt: false,
        termindato: new Date('01.03.2019'),
    },
    førsteUtbetalingsdag: new Date('01.01.2019'),
    harGodkjentVilkår: true,
    harGodkjentOppsummering: true,
    arbeidsforhold: {
        arbeidsgiverNavn: 'Luminous Biomash',
        arbeidsgiverId: '1238421',
        arbeidsgiverIdType: 'orgnr',
        fom: new Date('01.01.2018'),
        stillingsprosent: 100,
    },
    tilrettelegging: {
        type: Tilretteleggingstype.REDUSERT_STILLINGSPROSENT,
        fraDato: new Date('01.01.2019'),
        stillingsprosent: 80,
    },
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },
};

const Svangerskapspengesøknad: React.FunctionComponent = () => {
    const onClick = () => {
        Api.sendSøknad(mockedSøknad);
    };

    return (
        <>
            <p>Svangerskapspengesøknad</p>
            <button onClick={onClick}>Send søknad</button>
        </>
    );
};

export default Svangerskapspengesøknad;
