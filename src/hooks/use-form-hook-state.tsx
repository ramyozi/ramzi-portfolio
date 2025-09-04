import { useForm, UseFormReturn } from 'react-hook-form';

export type UseFormHookStateReturn<T> = [
  T,
  (value: T) => void,
  UseFormReturn<{ data: T }>,
];

export const useFormHookState = <
  T extends string | number | boolean | undefined | null,
>(
  defaultValue: T,
  dataKey = 'data'
): UseFormHookStateReturn<T> => {
  const formHook = useForm<any>({
    defaultValues: {
      [dataKey]: defaultValue,
    },
  });

  const value = formHook.watch(dataKey) as T;

  const setValue = (value: T) => {
    formHook.setValue(dataKey, value);
  };

  return [value, setValue, formHook];
};
