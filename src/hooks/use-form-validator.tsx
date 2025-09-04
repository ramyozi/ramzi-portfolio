import { useTranslations } from 'next-intl';
import { z, ZodType } from 'zod';
import { UseFormReturn } from 'react-hook-form';

export const useFormValidator = () => {
  const t = useTranslations();

  function stringValidation({
    optional = false,
    min,
    max,
    emptyAsNull = true,
  }: {
    optional?: boolean;
    min?: number;
    max?: number;
    emptyAsNull?: boolean;
  }): ZodType<string | null> {
    let schema = z.string();

    if (min !== undefined) schema = schema.min(min, { message: t('common.form.error.minLength', { n: min }) });
    if (max !== undefined) schema = schema.max(max, { message: t('common.form.error.maxLength', { n: max }) });

    const transformed = schema.transform((val) => (emptyAsNull && val.trim() === '' ? null : val));

    return optional ? transformed.optional() : transformed;
  }

  function emailValidation({
    optional = false,
    emptyAsNull = true,
  }: {
    optional?: boolean;
    emptyAsNull?: boolean;
  }): ZodType<string | null> {
    const base = z.string().email({ message: t('common.form.error.invalidEmail') });

    const transformed = base.transform((val) => (emptyAsNull && val.trim() === '' ? null : val));

    return optional ? transformed.optional() : transformed;
  }

  return { stringValidation, emailValidation };
};

export const registerFormReset = (form: UseFormReturn<any>) => () => {
  const formData = form.getValues();
  form.reset({ ...formData });
};
