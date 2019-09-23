import moment from 'moment';
import { get, set, merge } from 'lodash';
import { UferdigSøknad, Søknadfeil, Søknadsgrunnlag } from 'app/types/Søknad';
import Valideringsfeil from 'app/types/Valideringsfeil';
import { FormikErrors } from 'formik';
import { Tilretteleggingstype, Arbeidsforholdstype } from '../../types/Tilrettelegging';

const validateTilrettelegging = (søknad: UferdigSøknad, arbeidsforholdId?: string): Søknadfeil => {
    const errors: Søknadfeil = {};

    const idx = søknad.søknadsgrunnlag.findIndex((grunnlag: Søknadsgrunnlag) => grunnlag.id === arbeidsforholdId);
    if (søknad.tilrettelegging) {
        søknad.tilrettelegging.forEach((tilrettelegging, index) => {
            if (index > idx) {
                // Ikke valider arbeidsforhold som bruker ikke har kommet til enda i stegflyten
                return;
            }
            const tErrors: FormikErrors<any> = {};

            const getInputName = (name: string) => `tilrettelegging.${index}.${name}`;
            const tilretteleggingstypeName = getInputName('type');
            const valgteTyper = get(søknad, tilretteleggingstypeName) || [];

            if (
                tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
                tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG
            ) {
                if (tilrettelegging.risikoFaktorer === undefined || tilrettelegging.risikoFaktorer.length < 3) {
                    set(tErrors, 'risikoFaktorer', Valideringsfeil.FELTET_ER_PÅKREVD);
                }
                if (tilrettelegging.risikoFaktorer !== undefined && tilrettelegging.risikoFaktorer.length > 2000) {
                    set(tErrors, 'risikoFaktorer', Valideringsfeil.FELTET_KAN_VÆRE_MAX_2000_TEGN);
                }
                if (
                    tilrettelegging.tilretteleggingstiltak === undefined ||
                    tilrettelegging.tilretteleggingstiltak.length < 3
                ) {
                    set(tErrors, 'tilretteleggingstiltak', Valideringsfeil.FELTET_ER_PÅKREVD);
                }
                if (
                    tilrettelegging.tilretteleggingstiltak !== undefined &&
                    tilrettelegging.tilretteleggingstiltak.length > 2000
                ) {
                    set(tErrors, 'tilretteleggingstiltak', Valideringsfeil.FELTET_KAN_VÆRE_MAX_2000_TEGN);
                }
            }

            if (valgteTyper.length === 0) {
                set(tErrors, 'type', Valideringsfeil.FELTET_ER_PÅKREVD);
            }

            if (valgteTyper.includes(Tilretteleggingstype.INGEN)) {
                if (tilrettelegging.ingenTilrettelegging) {
                    tilrettelegging.ingenTilrettelegging.forEach((ingenTil, ind) => {
                        if (
                            ingenTil.slutteArbeidFom &&
                            moment(ingenTil.slutteArbeidFom).isBefore(tilrettelegging.behovForTilretteleggingFom)
                        ) {
                            set(
                                tErrors,
                                `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                            );
                        }

                        if (ingenTil.slutteArbeidFom === undefined) {
                            set(
                                tErrors,
                                `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                Valideringsfeil.FELTET_ER_PÅKREVD
                            );
                        }
                    });
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.DELVIS)) {
                if (tilrettelegging.delvisTilrettelegging) {
                    tilrettelegging.delvisTilrettelegging.forEach((delTil, ind) => {
                        if (
                            delTil.tilrettelagtArbeidFom &&
                            moment(delTil.tilrettelagtArbeidFom).isBefore(tilrettelegging.behovForTilretteleggingFom)
                        ) {
                            set(
                                tErrors,
                                `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                            );
                        }

                        // Browser konverterer ugyldig input for <input type="number" ... /> til tom streng
                        const isEmptyInputField =
                            delTil.stillingsprosent !== undefined &&
                            ((delTil.stillingsprosent as unknown) as string).length === 0;

                        if (
                            delTil.stillingsprosent !== undefined &&
                            !isEmptyInputField &&
                            (delTil.stillingsprosent <= 0 || delTil.stillingsprosent >= 100)
                        ) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.stillingsprosent`,
                                    Valideringsfeil.STILLINGSPROSENT_RANGE
                                )
                            );
                        }

                        if (isEmptyInputField || delTil.stillingsprosent === undefined) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.stillingsprosent`,
                                    Valideringsfeil.FELTET_ER_PÅKREVD
                                )
                            );
                        }

                        if (delTil.tilrettelagtArbeidFom === undefined) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    Valideringsfeil.FELTET_ER_PÅKREVD
                                )
                            );
                        }
                    });
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.HEL)) {
                if (tilrettelegging.helTilrettelegging) {
                    tilrettelegging.helTilrettelegging.forEach((helTil, ind) => {
                        if (
                            helTil.tilrettelagtArbeidFom &&
                            moment(helTil.tilrettelagtArbeidFom).isBefore(tilrettelegging.behovForTilretteleggingFom)
                        ) {
                            set(
                                tErrors,
                                `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                            );
                        }

                        if (helTil.tilrettelagtArbeidFom === undefined) {
                            set(
                                tErrors,
                                `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                Valideringsfeil.FELTET_ER_PÅKREVD
                            );
                        }
                    });
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
