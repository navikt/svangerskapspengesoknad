import React from 'react';
import TrashcanIkon from '../ikoner/TrashcanIkon';
import './slettKnapp.less';
import { KnappBaseProps } from 'nav-frontend-knapper';

export interface SlettKnappProps extends KnappBaseProps {
    ariaLabel: string;
    onClick: () => void;
}

const SlettKnapp: React.StatelessComponent<SlettKnappProps> = ({ onClick, ariaLabel }) => (
    <button
        type="button"
        className="slettKnapp"
        aria-label={ariaLabel}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
    >
        <TrashcanIkon width={20} height={20} />
    </button>
);

export default SlettKnapp;
