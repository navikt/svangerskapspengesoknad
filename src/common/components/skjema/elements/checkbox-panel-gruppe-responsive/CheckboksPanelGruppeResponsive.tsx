import React from 'react';
import classnames from 'classnames';
import { SkjemaGruppe, Fieldset, CheckboksPanel, CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import './checkboksPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';
import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';

interface ResponsiveProps {
    columns?: undefined | 2 | 1;
    disabled?: boolean;
}

export type CheckboxPanelgruppeResponsiveProps = CheckboksPanelGruppeProps & ResponsiveProps;

class CheckboksPanelGruppeResponsive extends React.Component<CheckboxPanelgruppeResponsiveProps> {
    render() {
        const { feil, columns, disabled = false, legend, checkboxes, onChange } = this.props;

        if (checkboxes === undefined) {
            return null;
        }

        const cls = classnames('checkboksPanelWrapper', {
            'checkboksPanelWrapper--twoColumns': columns === 2,
            'checkboksPanelWrapper--oneColumn': columns === 1,
        });

        return (
            <div className="checkboksPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe className="checkboksPanelGruppe--responsive" feil={feil}>
                        {checkboxes &&
                            checkboxes.map((checkboks: CheckboksProps, index: number) => {
                                return (
                                    <div className={cls} key={checkboks.value}>
                                        <CheckboksPanel
                                            {...checkboks}
                                            checked={checkboks.checked || false}
                                            disabled={disabled || false}
                                            onChange={(event) => onChange(event, checkboks.value)}
                                            key={index}
                                        />
                                    </div>
                                );
                            })}
                    </SkjemaGruppe>
                </Fieldset>
            </div>
        );
    }
}

export default CheckboksPanelGruppeResponsive;
