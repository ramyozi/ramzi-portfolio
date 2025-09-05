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
      schema = schema.min(min, {
        message: t('common.form.error.minLength', { n: min }),
      });

    if (max !== undefined)
      schema = schema.max(max, {
        message: t('common.form.error.maxLength', { n: max }),
      });

    return schema;
  }

  function emailValidation(): ZodType<string> {
    return z.string().email({ message: t('common.form.error.invalidEmail') });
  }

  return { stringValidation, emailValidation };
};
