import StegID from 'app/types/StegID';

export const SØKNADSSTEG = [StegID.FØRSTE_STEG, StegID.ANDRE_STEG, StegID.OPPSUMMERING];

export const søknadStegPath = (steg: StegID) => `/soknad/${steg}`;

export const getAdjacentSteps = (stegID: StegID) => {
    const stegIndex = SØKNADSSTEG.indexOf(stegID);
    const previousStep = stegIndex === 0 ? undefined : SØKNADSSTEG[stegIndex - 1];
    const nextStep = stegIndex === SØKNADSSTEG.length - 1 ? undefined : SØKNADSSTEG[stegIndex + 1];

    return [previousStep, nextStep];
};
