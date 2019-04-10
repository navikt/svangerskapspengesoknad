import React from 'react';
import classnames from 'classnames';
import { SkjemaGruppe, Fieldset, CheckboksPanel, CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import './checkboksPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';
import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';

export interface CheckboksPanelGruppeResponsiveProps {
    twoColumns?: boolean;
    disabled?: boolean;
}

type Props = CheckboksPanelGruppeProps & CheckboksPanelGruppeResponsiveProps;

class CheckboksPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const { feil, twoColumns = false, disabled = false, legend, checkboxes, onChange } = this.props;

        if (checkboxes === undefined) {
            return null;
        }

        const cls = classnames('checkboksPanelWrapper', {
            'checkboksPanelWrapper--twoColumns': twoColumns === true,
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
                                            checked={checkboks.checked || false}
                                            disabled={disabled || false}
                                            onChange={(event) => onChange(event, checkboks.value)}
                                            {...checkboks}
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
