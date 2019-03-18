import { InjectedIntl } from 'react-intl';
import * as countries from 'i18n-iso-countries';

const filteredListEØSCountries = (countryOptionValue: string, shouldFilter?: boolean) => {
    if (shouldFilter) {
        switch (countryOptionValue) {
            case 'BE':
            case 'BG':
            case 'DK':
            case 'EE':
            case 'FI':
            case 'FR':
            case 'GR':
            case 'IE':
            case 'IS':
            case 'IT':
            case 'HR':
            case 'CY':
            case 'LV':
            case 'LI':
            case 'LT':
            case 'LU':
            case 'MT':
            case 'NL':
            case 'PL':
            case 'PT':
            case 'RO':
            case 'SK':
            case 'SI':
            case 'ES':
            case 'GB':
            case 'SE':
            case 'CZ':
            case 'DE':
            case 'HU':
            case 'AT':
            case 'CH':
                return true;
            default:
                return false;
        }
    } else {
        return true;
    }
};

export const getCountries = (filter: boolean, intl: InjectedIntl): React.ReactNode[] => {
    const språk = intl.locale;
    const isoCodeIndex = 0;

    return Object.entries(countries.getNames(språk))
        .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], språk))
        .filter((countryOptionValue: string[]) => filteredListEØSCountries(countryOptionValue[isoCodeIndex], filter));
};

export default getCountries;
