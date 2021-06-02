import React from 'react';
import { ReactNode } from 'react';
import { NUIContext } from '../context/NuiContext';
export interface NuiEvent<T> {
    type: string;
    resource: string;
    payload: T;
}
export interface NuiProviderProps {
    children: ReactNode;
    context?: React.Context<NUIContext>;
    validateEvent?(event: MessageEvent<NuiEvent<unknown>>): boolean;
}
export declare const NuiProvider: (props: NuiProviderProps) => JSX.Element;
