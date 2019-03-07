export enum StepID {
    'TERMIN' = 'termin',
    'ARBEIDSFORHOLD' = 'arbeidsforhold',
    'TILRETTELEGGING' = 'tilrettelegging',
    'OPPSUMMERING' = 'oppsummering',
    'INGEN' = 'ingen',
}

interface SøknadStep {
    step: StepID;
    subStep?: string;
}

export default SøknadStep;
