enum Valideringsfeil {
    FELTET_ER_PÅKREVD = 'feltetErPåkrevd',
    VILKÅR_MÅ_GODKJENNES = 'vilkårMåGodkjennes',
    OPPSUMMERING_MÅ_GODKJENNES = 'oppsummeringMåGodkjennes',
    FØDSELSDATO_MÅ_VÆRE_TILBAKE_I_TID = 'fødselsdatoMåVæreTilbakeITid',
    TERMINDATO_ER_PÅKREVD = 'termindatoErPåkrevd',
    TIDLIGERE_OPPHOLD_MÅ_VÆRE_TILBAKE_I_TID = 'tidligereOppholdMåVæreTilbakeITid',
    TIDLIGERE_OPPHOLD_MÅ_VÆRE_FREMOVER_I_TID = 'tidligereOppholdMåVæreFremoverITid',
    TIDSREISER_IKKE_TILLATT = 'tidsreiserIkkeTillatt',
    STILLINGSPROSENT_RANGE = 'stillingsprosentRange',
    TILRETTELAGT_ARBEID_FOR_TIDLIG = 'tilrettelagtArbeidForTidlig',
    UGYLDIG_ORGANISASJONSNUMMER = 'ugyldigOrganisasjonsnummer',
    MÅ_VÆRE_HELTALL = 'måVæreHeltall',
    MÅ_BESTÅ_AV_9_SIFFER = 'måBeståAv9Siffer',
    FELTET_KAN_VÆRE_MAX_100_TEGN = 'feltetKanVæreMax100Tegn',
    FELTET_KAN_VÆRE_MAX_2000_TEGN = 'feltetKanVæreMax2000Tegn'
}

export default Valideringsfeil;
