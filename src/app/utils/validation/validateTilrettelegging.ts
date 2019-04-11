import moment from 'moment';
import { get, set } from 'lodash';
import { UferdigSøknad, Søknadfeil } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';
import { FormikErrors } from 'formik';
import { Tilretteleggingstype } from '../../types/Tilrettelegging';

const validateTilrettelegging = (søknad: UferdigSøknad): Søknadfeil => {
    const errors: Søknadfeil = {};

    if (søknad.tilrettelegging) {
        søknad.tilrettelegging.forEach((t, index) => {
            const tErrors: FormikErrors<any> = {};

            const getInputName = (name: string) => `tilrettelegging.${index}.${name}`;
            const tilretteleggingstypeName = getInputName('type');
            const valgteTyper = get(søknad, tilretteleggingstypeName) || [];

            if (valgteTyper.length === 0) {
                set(tErrors, 'type', Valideringsfeil.FELTET_ER_PÅKREVD);
            }

            if (valgteTyper.includes(Tilretteleggingstype.INGEN)) {
                if (
                    t.ingenTilrettelegging &&
                    (t.ingenTilrettelegging.slutteArbeidFom &&
                        moment(t.ingenTilrettelegging.slutteArbeidFom).isBefore(t.behovForTilretteleggingFom))
                ) {
                    set(
                        tErrors,
                        'ingenTilrettelegging.slutteArbeidFom',
                        Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                    );
                } else if (!t.ingenTilrettelegging) {
                    set(tErrors, 'ingenTilrettelegging.slutteArbeidFom', Valideringsfeil.FELTET_ER_PÅKREVD);
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.DELVIS)) {
                if (t.delvisTilrettelegging) {
                    if (
                        t.delvisTilrettelegging.stillingsprosent < 0 ||
                        t.delvisTilrettelegging.stillingsprosent > 100
                    ) {
                        set(tErrors, 'delvisTilrettelegging.stillingsprosent', Valideringsfeil.STILLINGSPROSENT_RANGE);
                    } else if (t.delvisTilrettelegging.stillingsprosent === undefined) {
                        set(tErrors, 'delvisTilrettelegging.stillingsprosent', Valideringsfeil.FELTET_ER_PÅKREVD);
                    }
                    if (
                        t.delvisTilrettelegging.tilrettelagtArbeidFom &&
                        moment(t.delvisTilrettelegging.tilrettelagtArbeidFom).isBefore(t.behovForTilretteleggingFom)
                    ) {
                        set(
                            tErrors,
                            'delvisTilrettelegging.tilrettelagtArbeidFom',
                            Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                        );
                    } else if (t.delvisTilrettelegging.tilrettelagtArbeidFom === undefined) {
                        set(tErrors, 'delvisTilrettelegging.tilrettelagtArbeidFom', Valideringsfeil.FELTET_ER_PÅKREVD);
                    }
                } else {
                    set(tErrors, 'delvisTilrettelegging.stillingsprosent', Valideringsfeil.FELTET_ER_PÅKREVD);
                    set(tErrors, 'delvisTilrettelegging.tilrettelagtArbeidFom', Valideringsfeil.FELTET_ER_PÅKREVD);
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.HEL)) {
                if (t.helTilrettelegging) {
                    if (
                        t.helTilrettelegging.tilrettelagtArbeidFom &&
                        moment(t.helTilrettelegging.tilrettelagtArbeidFom).isBefore(t.behovForTilretteleggingFom)
                    ) {
                        set(
                            tErrors,
                            'helTilrettelegging.tilrettelagtArbeidFom',
                            Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                        );
                    }
                } else {
                    set(
                        tErrors,
                        getInputName('helTilrettelegging.tilrettelagtArbeidFom'),
                        Valideringsfeil.FELTET_ER_PÅKREVD
                    );
                }
            }
            if (Object.keys(tErrors).length > 0) {
                if (!errors.tilrettelegging) {
                    errors.tilrettelegging = [];
                }
                errors.tilrettelegging.push(tErrors);
            }
        });
    }
    return errors;
};

export default validateTilrettelegging;
