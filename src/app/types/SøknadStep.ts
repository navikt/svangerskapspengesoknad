export enum StepID {
    'TERMIN' = 'termin',
    'ARBEIDSFORHOLD' = 'arbeidsforhold',
    'TILRETTELEGGING' = 'tilrettelegging',
    'OPPSUMMERING' = 'oppsummering',
}

interface SøknadStep {
    step: StepID;
    subStep?: string;
}

export default SøknadStep;
