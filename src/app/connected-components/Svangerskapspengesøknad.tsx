import React from 'react';
import * as Api from '../api/api';
import Søknad, { Søknadstype } from 'app/types/Søknad';

/*
{
    type: "engangsstønad",
    erEndringssøknad: false,
    barn: {
        fødselsdatoer: [],
        erBarnetFødt: false,
        antallBarn: 1,
        termindato: "2019-02-02T11:00:00.000Z",
        terminbekreftelseDato: "2019-02-02T11:00:00.000Z"
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        iNorgePåHendelsestidspunktet: true
    },
    annenForelder: {},
    vedlegg: [
        {
            id: "I000062",
            file: {},
            filename: "dhis-predictor-timeline.pdf",
            filesize: 58274,
            uploaded: true,
            pending: false,
            type: "terminbekreftelse",
            skjemanummer: "I000062",
            url: "http://localhost:8888/rest/storage/vedlegg/b3567379-6406-4e08-a53b-a968e7769234",
            uuid: "b3567379-6406-4e08-a53b-a968e7769234"
        }
    ]
}
*/

const mockedSøknad: Søknad = {
    type: Søknadstype.SVANGERSKAPSPENGER,
    vedlegg: [],
    erEndringssøknad: false,
    barn: {
        erBarnetFødt: false,
        termindato: '2019-02-02T11:00:00.000Z',
    },
    informasjonOmUtenlandsopphold: {
        jobbetINorgeSiste12Mnd: true,
        iNorgePåHendelsestidspunktet: true,
        iNorgeSiste12Mnd: true,
        iNorgeNeste12Mnd: true,
        tidligereOpphold: [],
        senereOpphold: [],
    },

    // arbeidsforhold: {
    //     arbeidsgiverNavn: 'Luminous Biomash',
    //     arbeidsgiverId: '1238421',
    //     arbeidsgiverIdType: 'orgnr',
    //     fom: new Date('01.01.2018'),
    //     stillingsprosent: 100,
    // },
    // tilrettelegging: {
    //     type: Tilretteleggingstype.REDUSERT_STILLINGSPROSENT,
    //     fraDato: new Date('01.01.2019'),
    //     stillingsprosent: 80,
    // },
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
