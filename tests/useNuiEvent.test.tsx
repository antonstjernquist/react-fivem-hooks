import React, { createContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { NuiProvider } from "../src/provider/NuiProvider";
import { useNuiEvent } from "../src/hooks/useNuiEvent";
import { NUIContext } from "../src/context/NuiContext";
import { act } from "react-dom/test-utils";
import { describe, it, afterEach, vi, expect } from "vitest";

import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("Testing NuiProvider", () => {
  it("should have called addHandler & removeHandler", () => {
    const addHandler = vi.fn();
    const removeHandler = vi.fn();
    const HandlersComponent = () => {
      const TestContext = createContext({
        addHandler,
        removeHandler,
      } as NUIContext);

      useNuiEvent({
        event: "UNKNOWN",
        context: TestContext,
      });

      return <span>I hereby render!</span>;
    };

    const component = render(
      <NuiProvider>
        <HandlersComponent />
      </NuiProvider>
    );

    expect(screen.getByText("I hereby render!")).toBeInTheDocument();
    expect(addHandler).toHaveBeenCalledTimes(1);
    component.unmount();
    expect(removeHandler).toHaveBeenCalledTimes(1);
  });

  it("should have ran the callback when message was posted", async () => {
    const callback = vi.fn();
    const CallbackComponent = () => {
      useNuiEvent({
        event: "CALLBACK_EVENT",
        callback,
      });

      return <span>I hereby render!</span>;
    };

    render(
      <NuiProvider>
        <CallbackComponent />
      </NuiProvider>
    );

    expect(screen.getByText("I hereby render!")).toBeInTheDocument();
    act(() => {
      window.postMessage({ type: "CALLBACK_EVENT", payload: "Amazing!" }, "*");
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalledWith("Amazing!");
    });
  });

  it("should not remove all handlers when removing handler.", async () => {
    const callback = vi.fn();
    const callbackTwo = vi.fn();

    const CallbackComponent = () => {
      useNuiEvent({
        event: "CALLBACK_EVENT",
        callback,
      });

      return <span>I hereby render!</span>;
    };

    const CallbackComponentTwo = () => {
      useNuiEvent({
        event: "CALLBACK_EVENT_TWO",
        callback: callbackTwo,
      });

      return <span>I hereby render!</span>;
    };

    render(
      <NuiProvider>
        <CallbackComponent />
        <CallbackComponentTwo />
      </NuiProvider>
    );

    act(() => {
      window.postMessage({ type: "CALLBACK_EVENT", payload: "Amazing!" }, "*");
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalledWith("Amazing!");
    });

    expect(callbackTwo).not.toHaveBeenCalled();

    /**
     * Removing the first handler
     */
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      window.postMessage({ type: "CALLBACK_EVENT", payload: "Amazing!" }, "*");
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(2);
    });

    expect(callbackTwo).not.toHaveBeenCalled();
  });
});
