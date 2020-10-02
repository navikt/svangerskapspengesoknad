import moment from 'moment';
import { isEmpty } from 'lodash';

import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';

import {
    dagenEtter,
    niMånederFremITid,
    etÅrSiden,
    enMånedSiden,
    halvannetÅrSiden,
} from '../../../common/util/datoUtils';

const validateTermin = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};
    let barn = {};

    if (søknad.barn.fødselsdato) {
        if (!moment(søknad.barn.fødselsdato).isBefore(dagenEtter(new Date()).toDate())) {
            barn = {
                fødselsdato: Valideringsfeil.FØDSELSDATO_MÅ_VÆRE_TILBAKE_I_TID,
            };
        }

        if (moment(søknad.barn.fødselsdato).isBefore(halvannetÅrSiden(new Date()).toDate())) {
            barn = {
                fødselsdato: Valideringsfeil.FOR_LANGT_TILBAKE_I_TID,
            };
        }
    }

    if (søknad.barn.termindato === undefined) {
        barn = {
            termindato: Valideringsfeil.TERMINDATO_ER_PÅKREVD,
        };
    }

    if (søknad.barn.termindato) {
        if (moment(søknad.barn.termindato).isSameOrAfter(niMånederFremITid(new Date()).toDate())) {
            barn = {
                termindato: Valideringsfeil.FOR_LANGT_FREM_I_TID,
            };
        }

        if (moment(søknad.barn.termindato).isBefore(etÅrSiden(new Date()).toDate())) {
            barn = {
                termindato: Valideringsfeil.FOR_LANGT_TILBAKE_I_TID,
            };
        }

        if (
            moment(søknad.barn.termindato).isBefore(enMånedSiden(new Date()).toDate()) &&
            søknad.barn.fødselsdato === undefined
        ) {
            barn = {
                fødselsdato: Valideringsfeil.VENNLIGST_OPPGI_BARNETS_FØDSELSDATO,
            };
        }
    }

    if (!isEmpty(barn)) {
        errors.barn = barn;
    }

    return errors;
};

export default validateTermin;
