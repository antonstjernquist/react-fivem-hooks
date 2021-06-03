
[![code type](https://img.shields.io/npm/types/fivem-hooks)](https://github.com/antonstjernquist) [![action](https://github.com/antonstjernquist/fivem-hooks/actions/workflows/publish.yml/badge.svg)](https://github.com/antonstjernquist/fivem-hooks/actions/workflows/publish.yml) [![npm version](https://img.shields.io/npm/v/fivem-hooks)](https://www.npmjs.com/package/fivem-hooks) [![downloads](https://img.shields.io/npm/dw/fivem-hooks?color=%2334D058)](https://www.npmjs.com/package/fivem-hooks) 

# FiveM Hooks

Essential React hooks for FiveM NUI development written in Typescript


## Wrap the component in the provider
```Typescript
import { NuiProvider } from 'fivem-hooks';

ReactDOM.render(
  <NuiProvider>
    <App />
  </NuiProvider>,
  document.getElementById('root')
);
```

## Use the hook, specify the type it will return
```Typescript
import { useNuiEvent } from 'fivem-hooks';

export const Component = () => {
  const { data } = useNuiEvent<boolean>({ event: 'SET_NUI_OPEN' });

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>NUI Content</h1>
      <span>Hello this is displayed</span>
    </div>
  );
}
```
