import { createContext } from 'react';
import { NuiEvent } from '../provider/NuiProvider';

export interface NUIContext {
  addHandler<T = unknown>(
    event: string,
    handler: (event: MessageEvent<NuiEvent<T>>) => void
  ): void;
  removeHandler(event: string): void;
}

export const NuiContext = createContext<NUIContext>({
  removeHandler: () => {
    console.error(
      'Failed to remove event. The context has not been initialized. Make sure to wrap your component with the <NUIProvider />'
    );
  },
  addHandler: () => {
    console.error(
      'Failed to add event. The context has not been initialized. Make sure to wrap your component with the <NUIProvider />'
    );
  },
});
