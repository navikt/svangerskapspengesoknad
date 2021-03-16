import React from 'react';
import classnames from 'classnames';
import { SkjemaGruppe, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import Infoboks from 'common/components/infoboks/Infoboks';

import './radioPanelGruppeResponsive.less';

interface ResponsiveProps {
    twoColumns?: boolean;
    fieldsetClassname?: string;
    infoboksTekst?: string | React.ReactNode;
}

export type RadioPanelGruppeResponsiveProps = ResponsiveProps & RadioPanelGruppeProps;

class RadioPanelGruppeResponsive extends React.Component<RadioPanelGruppeResponsiveProps> {
    render() {
        const {
            feil,
            twoColumns = false,
            infoboksTekst,
            fieldsetClassname,
            legend,
            checked,
            name,
            radios,
            onChange,
        } = this.props;

        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true,
        });

        return (
            <div className="radioPanelGruppe">
                <SkjemaGruppe feil={feil} legend={legend}>
                    {infoboksTekst && <Infoboks fieldsetClsName={fieldsetClassname} tekst={infoboksTekst} />}
                    <div className="radioPanelGruppe--responsive">
                        {radios.map((radio) => {
                            return (
                                <div className={cls} key={`${radio.value}`}>
                                    <RadioPanel
                                        checked={checked === radio.value}
                                        name={name}
                                        onChange={(event) => onChange(event, radio.value)}
                                        {...radio}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </SkjemaGruppe>
            </div>
        );
    }
}

export default RadioPanelGruppeResponsive;
