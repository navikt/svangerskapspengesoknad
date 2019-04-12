import React, { FunctionComponent } from 'react';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søknadsgrunnlag } from 'app/types/Søknad';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import { getRelevanteArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import InformasjonOmFrilans from './components/InformasjonOmFrilans';
import { FrilansInformasjon } from 'app/types/FrilansInformasjon';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import InformasjonOmSelvstendig from './components/InformasjonOmSelvstendig';
import InformasjonOmAndreInntekter from './components/InformasjonOmAndreInntekter';
import DuHarSvartNeiListe from './DuHarSvartNeiListe';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    søknadsgrunnlag: Søknadsgrunnlag[];
    harJobbetSomSelvstendigNæringsdrivende: boolean;
    harJobbetFrilans: boolean;
    harHattAndreInntektskilder: boolean;
    frilansInformasjon: Partial<FrilansInformasjon> | undefined;
    selvstendigInformasjon: Næring[] | undefined;
}

const ArbeidsforholdOppsummering: FunctionComponent<Props> = ({
    arbeidsforhold,
    søknadsgrunnlag,
    harJobbetSomSelvstendigNæringsdrivende,
    harJobbetFrilans,
    harHattAndreInntektskilder,
    frilansInformasjon,
    selvstendigInformasjon
}) => {
    return (
        <>
            <InformasjonOmArbeidsforholdWrapper
                arbeidsforhold={getRelevanteArbeidsforhold(arbeidsforhold, søknadsgrunnlag)}
            />

            {harJobbetFrilans && <InformasjonOmFrilans frilansInformasjon={frilansInformasjon!} />}

            {harJobbetSomSelvstendigNæringsdrivende &&
                selvstendigInformasjon!.map((info) => (
                    <InformasjonOmSelvstendig
                        key={`${info.navnPåNæringen}${info.organisasjonsnummer}`}
                        selvstendigInformasjon={info}
                    />
                ))}

            {harHattAndreInntektskilder && <InformasjonOmAndreInntekter />}

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
