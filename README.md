
[![code type](https://img.shields.io/npm/types/react-fivem-hooks)](https://github.com/antonstjernquist) [![action](https://github.com/antonstjernquist/react-fivem-hooks/actions/workflows/publish.yml/badge.svg)](https://github.com/antonstjernquist/react-fivem-hooks/actions/workflows/publish.yml) [![npm version](https://img.shields.io/npm/v/react-fivem-hooks)](https://www.npmjs.com/package/react-fivem-hooks) [![downloads](https://img.shields.io/npm/dw/react-fivem-hooks?color=%2334D058)](https://www.npmjs.com/package/react-fivem-hooks) 

# React FiveM Hooks

Essential React hooks for FiveM NUI development written in Typescript

## Install the package
```yarn add react-fivem-hooks```

## Wrap the component in the provider
```Typescript
import { NuiProvider } from 'react-fivem-hooks';

ReactDOM.render(
  <NuiProvider>
    <App />
  </NuiProvider>,
  document.getElementById('root')
);
```

## useNuiEvent
```Typescript
import { useNuiEvent } from 'react-fivem-hooks';

export const Component = () => {
  const { data: isOpen } = useNuiEvent<boolean>({ event: 'SET_NUI_OPEN' });

  return (
    <div>
      <span>{isOpen ? 'Profit.' : 'Closed.'}</span>
    </div>
  );
}
```

## Send the event (Browser console)
```Javascript
// Should display "Profit."
window.postMessage({ type: 'SET_NUI_OPEN', payload: true });
  
  
// Should display "Closed."
window.postMessage({ type: 'SET_NUI_OPEN', payload: false });
```


## useDisableControls (Disable input movement)
#### Generic hook to disable movement in FiveM when typing inside a input field.

**Note**: This feature requires the `nui-controls` library to be used on the client.

```Typescript
import { useDisableControls } from 'react-fivem-hooks';

export const Component = () => {
  const { controls } = useDisableControls();

  return (
    <div>
      <input placeholder="Yay, I don't move" {controls} />
    </div>
  );
}
```


## nui-controls (lua client library)
#### This is a resource included in this repository which you can utilise to easily disable controls when using input fields in your NUI.

1. Download `nui-controls` from this repository.
2. Put it in your server folder.
3. Add it to the resource you want to use the `useDisableControls`-hook like this:

```LUA
client_scripts {
  '@nui-controls/client.lua',
  '...',
}
```

4. Now you can utilise `useDisableControls` in your NUI.


### Disclaimer
"react-fivem-hooks" are not affiliated, associated, authorized, endorsed by, or in any way officially connected with the FiveM™ trademark, or any of its subsidiaries or its affiliates. The official FiveM™ website can be found at https://fivem.net/

