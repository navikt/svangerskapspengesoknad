import { InjectedIntl } from 'react-intl';
import * as countries from 'i18n-iso-countries';

// prettier-ignore
const countriesInEøs = [
    'BE', 'BG', 'DK', 'EE', 'FI', 'FR', 'GR', 'IE', 'IS', 'IT', 'HR', 'CY', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'GB', 'SE', 'CZ', 'DE', 'HU', 'AT', 'CH'];

const isCountryInEøs = (countryCode: string) => countriesInEøs.includes(countryCode);
const isCountryNorge = (countryCode: string) => countryCode === 'NO';

export const getCountries = (
    visLandUtenforEøs: boolean,
    visNorge: boolean,
    { locale }: InjectedIntl
): React.ReactNode[] => {
    const countryNames: Array<[string, string]> = Object.entries(countries.getNames(locale));
    const namesDescending = (a: string[], b: string[]) => a[1].localeCompare(b[1], locale);
    const applyFilters = ([countryCode]: string[]) => {
        const keepNorway = visNorge || !isCountryNorge(countryCode);
        const keepEøsCountry = visLandUtenforEøs || isCountryInEøs(countryCode);

        return keepNorway && keepEøsCountry;
    };

    return countryNames.sort(namesDescending).filter(applyFilters);
};

export default getCountries;
