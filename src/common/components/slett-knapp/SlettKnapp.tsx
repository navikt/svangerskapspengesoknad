import React from 'react';
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';
import TrashcanIkon from '../ikoner/TrashcanIkon';
import './slettKnapp.less';

export interface SlettKnappProps extends KnappProps {
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
