const config = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  data: {
    ok: true,
  },
};

export const getResourceName = () => (window as any).GetParentResourceName?.();

interface Options {
  resourceName?: string;
}

export const useDisableControls = (options?: Options) => {
  const resourceName = options?.resourceName ?? getResourceName();

  const handleDisable = () => {
    resourceName && fetch(`https://${resourceName}/disable_controls`, config);
  };

  const handleEnable = () => {
    resourceName && fetch(`https://${resourceName}/enable_controls`, config);
  };

  const controls = {
    onFocus: handleDisable,
    onBlur: handleEnable,
  };

  return { controls };
};
