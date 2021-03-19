import moment from 'moment';
import { get, set, merge } from 'lodash';
import { UferdigSøknad, Søknadfeil, Søknadsgrunnlag } from 'app/types/Søknad';
import { FormikErrors } from 'formik';
import {
    Tilretteleggingstype,
    Arbeidsforholdstype,
    IngenTilrettelegging,
    DelvisTilrettelegging,
    HelTilrettelegging,
} from '../../types/Tilrettelegging';
import { formatDate } from '../formatDate';

const validateTilrettelegging = (søknad: UferdigSøknad, arbeidsforholdId?: string): Søknadfeil => {
    const errors: Søknadfeil = {};
    const checkForDuplicateDates = (dates: string[], date: string) => {
        return dates.filter((d: string) => d === date).length > 1;
    };

    const tiMånederSiden = moment(søknad.barn.termindato).startOf('day').subtract(10, 'months');

    const idx = søknad.søknadsgrunnlag.findIndex((grunnlag: Søknadsgrunnlag) => grunnlag.id === arbeidsforholdId);
    if (søknad.tilrettelegging) {
        søknad.tilrettelegging.forEach((tilrettelegging, index) => {
            if (index > idx) {
                // Ikke valider arbeidsforhold som bruker ikke har kommet til enda i stegflyten
                return;
            }
            const tErrors: FormikErrors<any> = {};

            if (moment(tilrettelegging.behovForTilretteleggingFom).isBefore(tiMånederSiden)) {
                set(tErrors, 'behovForTilretteleggingFom', 'valideringsfeil.maxTiMånederFørTerminDato');
            }

            if (moment(tilrettelegging.behovForTilretteleggingFom).isSameOrAfter(søknad.barn.termindato)) {
                set(tErrors, 'behovForTilretteleggingFom', 'valideringsfeil.datoMåVæreFørTerminDato');
            }

            const getInputName = (name: string) => `tilrettelegging.${index}.${name}`;
            const tilretteleggingstypeName = getInputName('type');
            const valgteTyper = get(søknad, tilretteleggingstypeName) || [];

            const ingenTilretteleggingDatoer: string[] =
                tilrettelegging.ingenTilrettelegging !== undefined
                    ? tilrettelegging.ingenTilrettelegging
                          .filter((ingen: IngenTilrettelegging) => ingen.slutteArbeidFom !== undefined)
                          .reduce((result: string[], ingen: IngenTilrettelegging) => {
                              result.push(formatDate(ingen.slutteArbeidFom)!);
                              return result;
                          }, [])
                    : [];

            const delvisTilretteleggingDatoer: string[] =
                tilrettelegging.delvisTilrettelegging !== undefined
                    ? tilrettelegging.delvisTilrettelegging
                          .filter((delvis: DelvisTilrettelegging) => delvis.tilrettelagtArbeidFom !== undefined)
                          .reduce((result: string[], delvis: DelvisTilrettelegging) => {
                              result.push(formatDate(delvis.tilrettelagtArbeidFom)!);
                              return result;
                          }, [])
                    : [];

            const helTilretteleggingDatoer: string[] =
                tilrettelegging.helTilrettelegging !== undefined
                    ? tilrettelegging.helTilrettelegging
                          .filter((hel: HelTilrettelegging) => hel.tilrettelagtArbeidFom !== undefined)
                          .reduce((result: string[], hel: HelTilrettelegging) => {
                              result.push(formatDate(hel.tilrettelagtArbeidFom)!);
                              return result;
                          }, [])
                    : [];

            const alleDatoer = [
                ...ingenTilretteleggingDatoer,
                ...delvisTilretteleggingDatoer,
                ...helTilretteleggingDatoer,
            ];

            if (
                tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
                tilrettelegging.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG
            ) {
                if (tilrettelegging.risikoFaktorer === undefined || tilrettelegging.risikoFaktorer.length < 3) {
                    set(tErrors, 'risikoFaktorer', 'valideringsfeil.feltetErPåkrevd');
                }
                if (tilrettelegging.risikoFaktorer !== undefined && tilrettelegging.risikoFaktorer.length > 2000) {
                    set(tErrors, 'risikoFaktorer', 'valideringsfeil.feltetKanVæreMax2000Tegn');
                }
                if (
                    tilrettelegging.tilretteleggingstiltak === undefined ||
                    tilrettelegging.tilretteleggingstiltak.length < 3
                ) {
                    set(tErrors, 'tilretteleggingstiltak', 'valideringsfeil.feltetErPåkrevd');
                }
                if (
                    tilrettelegging.tilretteleggingstiltak !== undefined &&
                    tilrettelegging.tilretteleggingstiltak.length > 2000
                ) {
                    set(tErrors, 'tilretteleggingstiltak', 'valideringsfeil.feltetKanVæreMax2000Tegn');
                }
            }

            if (valgteTyper.length === 0) {
                set(tErrors, 'type', 'valideringsfeil.feltetErPåkrevd');
            }

            if (valgteTyper.includes(Tilretteleggingstype.INGEN)) {
                if (tilrettelegging.ingenTilrettelegging) {
                    tilrettelegging.ingenTilrettelegging.forEach((ingenTil, ind) => {
                        const { slutteArbeidFom } = ingenTil;

                        if (
                            slutteArbeidFom &&
                            moment(slutteArbeidFom).isBefore(tilrettelegging.behovForTilretteleggingFom)
                        ) {
                            set(
                                tErrors,
                                `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                'valideringsfeil.tilrettelagtArbeidForTidlig'
                            );
                        }

                        if (slutteArbeidFom === undefined) {
                            set(
                                tErrors,
                                `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                'valideringsfeil.feltetErPåkrevd'
                            );
                        }

                        if (slutteArbeidFom) {
                            if (moment(slutteArbeidFom).isSameOrAfter(søknad.barn.termindato)) {
                                set(
                                    tErrors,
                                    `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                    'valideringsfeil.forLangtFremITid'
                                );
                            }

                            if (moment(slutteArbeidFom).isBefore(tiMånederSiden)) {
                                set(
                                    tErrors,
                                    `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                    'valideringsfeil.forLangtTilbakeITid'
                                );
                            }
                        }

                        if (
                            slutteArbeidFom !== undefined &&
                            checkForDuplicateDates(alleDatoer, formatDate(slutteArbeidFom)!)
                        ) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `ingenTilrettelegging.${ind}.slutteArbeidFom`,
                                    'valideringsfeil.overlappendePeriode'
                                )
                            );
                        }
                    });
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.DELVIS)) {
                if (tilrettelegging.delvisTilrettelegging) {
                    tilrettelegging.delvisTilrettelegging.forEach((delTil, ind) => {
                        const { tilrettelagtArbeidFom } = delTil;

                        if (
                            tilrettelagtArbeidFom &&
                            moment(tilrettelagtArbeidFom).isBefore(tilrettelegging.behovForTilretteleggingFom)
                        ) {
                            set(
                                tErrors,
                                `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                'valideringsfeil.tilrettelagtArbeidForTidlig'
                            );
                        }

                        if (
                            tilrettelagtArbeidFom !== undefined &&
                            checkForDuplicateDates(alleDatoer, formatDate(tilrettelagtArbeidFom)!)
                        ) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.overlappendePeriode'
                                )
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
                                    'valideringsfeil.stillingsprosentRange'
                                )
                            );
                        }

                        if (isEmptyInputField || delTil.stillingsprosent === undefined) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.stillingsprosent`,
                                    'valideringsfeil.feltetErPåkrevd'
                                )
                            );
                        }

                        if (tilrettelagtArbeidFom === undefined) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.feltetErPåkrevd'
                                )
                            );
                        }

                        if (tilrettelagtArbeidFom) {
                            if (moment(tilrettelagtArbeidFom).isSameOrAfter(søknad.barn.termindato)) {
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.forLangtFremITid'
                                );
                            }

                            if (moment(tilrettelagtArbeidFom).isBefore(tiMånederSiden)) {
                                set(
                                    tErrors,
                                    `delvisTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.forLangtTilbakeITid'
                                );
                            }
                        }
                    });
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.HEL)) {
                if (tilrettelegging.helTilrettelegging) {
                    tilrettelegging.helTilrettelegging.forEach((helTil, ind) => {
                        const { tilrettelagtArbeidFom } = helTil;
                        if (
                            tilrettelagtArbeidFom &&
                            moment(tilrettelagtArbeidFom).isBefore(tilrettelegging.behovForTilretteleggingFom)
                        ) {
                            set(
                                tErrors,
                                `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                'valideringsfeil.tilrettelagtArbeidForTidlig'
                            );
                        }

                        if (tilrettelagtArbeidFom === undefined) {
                            set(
                                tErrors,
                                `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                'valideringsfeil.feltetErPåkrevd'
                            );
                        }

                        if (tilrettelagtArbeidFom) {
                            if (moment(tilrettelagtArbeidFom).isSameOrAfter(søknad.barn.termindato)) {
                                set(
                                    tErrors,
                                    `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.forLangtFremITid'
                                );
                            }

                            if (moment(tilrettelagtArbeidFom).isBefore(tiMånederSiden)) {
                                set(
                                    tErrors,
                                    `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.forLangtTilbakeITid'
                                );
                            }
                        }

                        if (
                            tilrettelagtArbeidFom !== undefined &&
                            checkForDuplicateDates(alleDatoer, formatDate(tilrettelagtArbeidFom)!)
                        ) {
                            merge(
                                tErrors,
                                set(
                                    tErrors,
                                    `helTilrettelegging.${ind}.tilrettelagtArbeidFom`,
                                    'valideringsfeil.overlappendePeriode'
                                )
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
