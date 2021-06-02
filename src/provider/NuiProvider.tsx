import React, { Props, useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import { NUIContext, NuiContext } from '../context/NuiContext';

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

export const NuiProvider = (props: NuiProviderProps) => {
  const Context = props.context ?? NuiContext;
  const handlers = useRef<Record<string, CallableFunction[]>>({});
  handlers.current = {};

  const addHandler = (
    event: string,
    handler: (event: MessageEvent) => void
  ) => {
    const existingHandlers = handlers.current[event] ?? [];
    handlers.current[event] = [...existingHandlers, handler];
  };

  const removeHandler = (event: string) => {
    delete handlers.current[event];
  };

  const eventHandler = (event: MessageEvent<NuiEvent<unknown>>) => {
    if (props.validateEvent && !props.validateEvent(event)) {
      return;
    }

    const { type } = event.data;

    if (
      handlers.current &&
      handlers.current[type] &&
      handlers.current[type].length > 0
    ) {
      handlers.current[type].forEach(handler => {
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
