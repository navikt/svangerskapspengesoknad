import React from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';

interface InnholdMedLedetekstProps {
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const hasListOfChildren = (children: string | string[]): boolean => (Array.isArray(children) ? true : false);

const InnholdMedLedetekst: React.StatelessComponent<InnholdMedLedetekstProps> = ({
    ledetekst,
    children,
    className,
}) => {
    return (
        <div className={className}>
            <Normaltekst>{ledetekst}</Normaltekst>
            {!Array.isArray(children) && hasListOfChildren((children as JSX.Element).props.children)
                ? (children as JSX.Element).props.children.map((child: string) => (
                      <Element className="feltoppsummering__verdi" key={guid()}>
                          {child}
                      </Element>
                  ))
                : children}
        </div>
    );
};

export default InnholdMedLedetekst;
