import React, { createContext, Dispatch, FunctionComponent, ReactNode, useMemo, useReducer } from 'react';
import { SvangerskapspengerContextAction } from './action/actionCreator';
import svangerskapspengerReducer from './reducer/svangerskapspengerReducer';
import { SvangerskapspengerContextState, svangerskapspengerInitialState } from './SvangerskapspengerContextConfig';

interface SvangerskapspengerContextData {
    state: SvangerskapspengerContextState;
    dispatch: Dispatch<SvangerskapspengerContextAction>;
}

export const SvangerskapspengerContext = createContext<SvangerskapspengerContextData>(null!);

interface Props {
    children: ReactNode;
}

const SvangerskapspengerContextProvider: FunctionComponent<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(svangerskapspengerReducer, svangerskapspengerInitialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <SvangerskapspengerContext.Provider value={contextValue}>{children}</SvangerskapspengerContext.Provider>;
};

export default SvangerskapspengerContextProvider;
