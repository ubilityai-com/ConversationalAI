import { useCallback, useEffect, useRef, useState } from "react";

interface UseDebounceConfigOptions {
  delay?: number;
  onSave?: (config: any) => void;
}

export function useDebounceConfig<T>(
  initialConfig: T,
  options: UseDebounceConfigOptions = {}
) {
  const { delay = 500, onSave } = options;
  const [localConfig, setLocalConfig] = useState<T>(initialConfig);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedSave = useCallback(
    (config: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (onSave) {
          console.log({ config });

          onSave(config);
        }
      }, delay);
    },
    [delay, onSave]
  );

  const updateConfig = useCallback(
    (updates: Partial<T> | ((prev: T) => T)) => {
      setLocalConfig((prev) => {
        const newConfig =
          typeof updates === "function"
            ? updates(prev)
            : { ...prev, ...updates };
        console.log({ newConfig });

        debouncedSave(newConfig);
        return newConfig;
      });
    },
    [debouncedSave]
  );

  const updateConfigField = useCallback(
    (field: keyof T, value: any) => {
      updateConfig({ [field]: value } as Partial<T>);
    },
    [updateConfig]
  );

  const updateNestedConfig = useCallback(
    (path: string, value: any) => {
      updateConfig((prev) => {
        const newConfig = { ...prev };
        console.log({ prev, path, value });

        const keys = path.split(".");
        let current: any = newConfig;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          const nextKey = keys[i + 1];
          const isNextIndex = !isNaN(Number(nextKey));

          if (!(key in current)) {
            current[key] = isNextIndex ? [] : {};
          }

          current = current[key];
        }
        console.log({ current });

        const lastKey = keys[keys.length - 1];
        current[lastKey] = value;
        return newConfig;
      });
    },
    [updateConfig]
  );

  return {
    localConfig,
    updateConfig,
    updateConfigField,
    updateNestedConfig,
    setLocalConfig,
  };
}
