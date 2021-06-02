/// <reference types="react" />
import { NUIContext } from '../context/NuiContext';
export interface UseNuiEventOptions<T> {
    event: string;
    defaultValue?: T;
    context?: React.Context<NUIContext>;
    callback?(data: T): void;
}
export declare function useNuiEvent<T>(options: UseNuiEventOptions<T>): {
    data: T;
};
