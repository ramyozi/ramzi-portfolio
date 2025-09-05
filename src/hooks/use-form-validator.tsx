import { useTranslations } from 'next-intl';
import { z, ZodType } from 'zod';

export const useFormValidator = () => {
  const t = useTranslations();

  // Only validate strings as strings, no optional()
  function stringValidation({
    min,
    max,
  }: {
    min?: number;
    max?: number;
  }): ZodType<string> {
    let schema = z.string();

    if (min !== undefined)
      schema = schema.min(min, { message: `Min length ${min}` });

    if (max !== undefined)
      schema = schema.max(max, { message: `Max length ${max}` });

    return schema;
  }

  function emailValidation(): ZodType<string> {
    return z.string().email({ message: t('common.form.error.invalidEmail') });
  }

  return { stringValidation, emailValidation };
};
