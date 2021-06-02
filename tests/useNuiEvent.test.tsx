import React, { createContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { NuiProvider } from '../src/provider/NuiProvider';
import { useNuiEvent } from '../src/hooks/useNuiEvent';
import { NUIContext } from '../src/context/NuiContext';
import { act } from 'react-dom/test-utils';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing NuiProvider', () => {
  test('should have called addHandler & removeHandler', () => {
    const addHandler = jest.fn();
    const removeHandler = jest.fn();
    const HandlersComponent = () => {
      const TestContext = createContext({
        addHandler,
        removeHandler,
      } as NUIContext);

      useNuiEvent({
        event: 'UNKNOWN',
        context: TestContext,
      });

      return <span>I hereby render!</span>;
    };

    const component = render(
      <NuiProvider>
        <HandlersComponent />
      </NuiProvider>
    );

    expect(screen.getByText('I hereby render!')).toBeInTheDocument();
    expect(addHandler).toHaveBeenCalledTimes(1);
    component.unmount();
    expect(removeHandler).toHaveBeenCalledTimes(1);
  });

  test('should have ran the callback when message was posted', async () => {
    const callback = jest.fn();
    const CallbackComponent = () => {
      useNuiEvent({
        event: 'CALLBACK_EVENT',
        callback,
      });

      return <span>I hereby render!</span>;
    };

    render(
      <NuiProvider>
        <CallbackComponent />
      </NuiProvider>
    );

    expect(screen.getByText('I hereby render!')).toBeInTheDocument();
    act(() => {
      window.postMessage({ type: 'CALLBACK_EVENT', payload: 'Amazing!' }, '*');
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalledWith('Amazing!');
    });
  });
});
