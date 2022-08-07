import React, { Props, useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import { NUIContext, NuiContext } from '../context/NuiContext';

export interface NuiEvent<T> {
  type: string;
  resource: string;
  payload: T;
}

export interface NuiProviderProps {
  debug?: boolean;
  children: ReactNode;
  context?: React.Context<NUIContext>;
  validateEvent?(event: MessageEvent<NuiEvent<unknown>>): boolean;
}

export const NuiProvider = (props: NuiProviderProps) => {
  const Context = props.context ?? NuiContext;
  const handlers = useRef<Record<string, CallableFunction[]>>({});

  const debug = (...args: unknown[]) => {
    if (!props.debug) {
      return;
    }

    console.debug(args);
  };

  const addHandler = (
    event: string,
    handler: (event: MessageEvent) => void
  ) => {
    debug('Adding handler for event', event);
    const existingHandlers = handlers.current[event] ?? [];
    debug('Existing handlers', existingHandlers);
    handlers.current[event] = [...existingHandlers, handler];
  };

  const removeHandler = (event: string) => {
    debug('Removing handler for event', event);
    delete handlers.current[event];
  };

  const eventHandler = (event: MessageEvent<NuiEvent<unknown>>) => {
    debug('Handling event', event);
    if (props.validateEvent && !props.validateEvent(event)) {
      debug('Returning! Event was invalid', event);
      return;
    }

    const { type } = event.data;
    debug('Checking if we should handle event .. ', type);

    if (
      handlers.current &&
      handlers.current[type] &&
      handlers.current[type].length > 0
    ) {
      handlers.current[type].forEach(handler => {
        debug('Running handler for', type);
        handler(event);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('message', eventHandler);
    return () => window.removeEventListener('message', eventHandler);
  }, []);

  return (
    <Context.Provider value={{ addHandler, removeHandler }}>
      {props.children}
    </Context.Provider>
  );
};
