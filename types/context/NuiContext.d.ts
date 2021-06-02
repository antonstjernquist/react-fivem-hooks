/// <reference types="react" />
import { NuiEvent } from '../provider/NuiProvider';
export interface NUIContext {
    addHandler<T = unknown>(event: string, handler: (event: MessageEvent<NuiEvent<T>>) => void): void;
    removeHandler(event: string): void;
}
export declare const NuiContext: import("react").Context<NUIContext>;
