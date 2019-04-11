import React, { FunctionComponent } from 'react';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søknadsgrunnlag } from 'app/types/Søknad';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import { getRelevanteArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import DuHarSvartNeiListe from './arbeidsforhold/DuHarSvartNeiListe';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    søknadsgrunnlag: Søknadsgrunnlag[];
    harJobbetSomSelvstendigNæringsdrivende: boolean;
    harJobbetFrilans: boolean;
    harHattAndreInntektskilder: boolean;
}

const ArbeidsforholdOppsummering: FunctionComponent<Props> = ({
    arbeidsforhold,
    søknadsgrunnlag,
    harJobbetSomSelvstendigNæringsdrivende,
    harJobbetFrilans,
    harHattAndreInntektskilder
}) => {
    return (
        <>
            <InformasjonOmArbeidsforholdWrapper
                arbeidsforhold={getRelevanteArbeidsforhold(arbeidsforhold, søknadsgrunnlag)}
            />
            {(!harJobbetSomSelvstendigNæringsdrivende || !harJobbetFrilans || !harHattAndreInntektskilder) && (
                <DuHarSvartNeiListe
                    arbeidsforholdOppsummering={true}
                    harHattAndreInntektskilder={harHattAndreInntektskilder}
                    harJobbetFrilans={harJobbetFrilans}
                    harJobbetSomSelvstendigNæringsdrivende={harJobbetSomSelvstendigNæringsdrivende}
                />
            )}
        </>
    );
};

export default ArbeidsforholdOppsummering;
