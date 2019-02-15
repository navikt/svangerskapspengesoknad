import axios from 'axios';
import Environment from 'app/Environment';
import Søknad from 'app/types/Søknad';

const apiBaseUrl = Environment.REST_API_URL;
const sendSøknadUrl = `${apiBaseUrl}/soknad`;

export function getSøkerinfo() {
    return axios.get(`${apiBaseUrl}/sokerinfo`, {
        timeout: 15 * 1000,
        withCredentials: true,
    });
}

export function sendSøknad(søknad: Søknad) {
    return axios.post(sendSøknadUrl, søknad, {
        withCredentials: true,
        timeout: 30 * 1000,
        headers: {
            'content-type': 'application/json;',
        },
    });
}
