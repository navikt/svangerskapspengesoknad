import moment from 'moment';
import { get, set } from 'lodash';
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
                if (
                    tilrettelegging.ingenTilrettelegging &&
                    (tilrettelegging.ingenTilrettelegging.slutteArbeidFom &&
                        moment(tilrettelegging.ingenTilrettelegging.slutteArbeidFom[0]).isBefore(
                            tilrettelegging.behovForTilretteleggingFom
                        ))
                ) {
                    set(
                        tErrors,
                        'ingenTilrettelegging.slutteArbeidFom',
                        Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                    );
                } else if (!tilrettelegging.ingenTilrettelegging) {
                    set(tErrors, 'ingenTilrettelegging.slutteArbeidFom', Valideringsfeil.FELTET_ER_PÅKREVD);
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.DELVIS)) {
                if (tilrettelegging.delvisTilrettelegging) {
                    if (
                        tilrettelegging.delvisTilrettelegging[0].stillingsprosent < 0 ||
                        tilrettelegging.delvisTilrettelegging[0].stillingsprosent > 100
                    ) {
                        set(tErrors, 'delvisTilrettelegging.stillingsprosent', Valideringsfeil.STILLINGSPROSENT_RANGE);
                    } else if (tilrettelegging.delvisTilrettelegging[0].stillingsprosent === undefined) {
                        set(tErrors, 'delvisTilrettelegging.stillingsprosent', Valideringsfeil.FELTET_ER_PÅKREVD);
                    }
                    if (
                        tilrettelegging.delvisTilrettelegging[0].tilrettelagtArbeidFom &&
                        moment(tilrettelegging.delvisTilrettelegging[0].tilrettelagtArbeidFom).isBefore(
                            tilrettelegging.behovForTilretteleggingFom
                        )
                    ) {
                        set(
                            tErrors,
                            'delvisTilrettelegging.tilrettelagtArbeidFom',
                            Valideringsfeil.TILRETTELAGT_ARBEID_FOR_TIDLIG
                        );
                    } else if (tilrettelegging.delvisTilrettelegging[0].tilrettelagtArbeidFom === undefined) {
                        set(tErrors, 'delvisTilrettelegging.tilrettelagtArbeidFom', Valideringsfeil.FELTET_ER_PÅKREVD);
                    }
                } else {
                    set(tErrors, 'delvisTilrettelegging.stillingsprosent', Valideringsfeil.FELTET_ER_PÅKREVD);
                    set(tErrors, 'delvisTilrettelegging.tilrettelagtArbeidFom', Valideringsfeil.FELTET_ER_PÅKREVD);
                }
            }
            if (valgteTyper.includes(Tilretteleggingstype.HEL)) {
                if (tilrettelegging.helTilrettelegging) {
                    if (
                        tilrettelegging.helTilrettelegging.tilrettelagtArbeidFom &&
                        moment(tilrettelegging.helTilrettelegging.tilrettelagtArbeidFom[0]).isBefore(
                            tilrettelegging.behovForTilretteleggingFom
                        )
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
