import React, { FunctionComponent } from 'react';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søknadsgrunnlag } from 'app/types/Søknad';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import { getRelevanteArbeidsforhold } from 'app/utils/arbeidsforholdUtils';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    søknadsgrunnlag: Søknadsgrunnlag[];
}

const ArbeidsforholdOppsummering: FunctionComponent<Props> = ({ arbeidsforhold, søknadsgrunnlag }) => {
    return (
        <InformasjonOmArbeidsforholdWrapper
            arbeidsforhold={getRelevanteArbeidsforhold(arbeidsforhold, søknadsgrunnlag)}
        />
    );
};

export default ArbeidsforholdOppsummering;
