import { useContext, useEffect, useState } from 'react';
import { NUIContext, NuiContext } from '../context/NuiContext';

// TODO: If a default value is specified just return <T>, instead of <T | undefined>. (Since it should always have a value!)
export interface UseNuiEventOptions<T> {
  event: string;
  defaultValue?: T;
  context?: React.Context<NUIContext>;
  callback?(data: T): void;
}

export function useNuiEvent<T>(options: UseNuiEventOptions<T>): { data: T };
export function useNuiEvent<T = unknown>(
  options: UseNuiEventOptions<T>
): { data: T | undefined } {
  const context = useContext(options.context ?? NuiContext);
  const [data, setData] = useState<T>(options.defaultValue);

  if (!context) {
    throw new Error('useNuiEvent must be used inside the NuiProvider');
  }

  if (!options.event) {
    throw new Error('Cannot use NuiEvent on nothing.');
  }

  useEffect(() => {
    context.addHandler<T>(options.event, event => {
      setData(event.data.payload);

      if (options.callback && typeof options.callback === 'function') {
        options.callback(event.data.payload);
      }
    });

    return () => {
      context.removeHandler(options.event);
    };
  }, []);

  return { data };
}
