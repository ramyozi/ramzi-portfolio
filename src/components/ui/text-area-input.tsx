'use client';
import * as React from 'react';
import { RefCallback } from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Info, Pencil } from 'lucide-react';
import { getValueInObject } from '@/lib/get-value-in-object.utils';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  formHook?: UseFormReturn<any>;
  capitalize?: boolean;
  trim?: boolean;
  onUpdateButtonClick?: () => void;
}

const TextArea = ({
  ref,
  className,
  label,
  formHook,
  capitalize = false,
  trim = true,
  onUpdateButtonClick,
  ...props
}: TextAreaProps & {
  ref?: RefCallback<HTMLTextAreaElement>;
}) => {
  const t = useTranslations();

  const error: any =
    (props.name &&
      getValueInObject<FieldErrors<any>[0]>(
        formHook?.formState?.errors,
        props.name
      )) ||
    null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = transformTextAreaValue(e.target.value, capitalize, false);

    e.target.value = value ?? '';

    if (formHook && props.name) {
      formHook.setValue(props.name, value);
    }

    if (props.onChange) props.onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = transformTextAreaValue(e.target.value, capitalize, trim);

    if (formHook && props.name) {
      formHook.setValue(props.name, value);
    }

    if (props.onBlur) props.onBlur(e);
  };

  return (
    <div className={cn('w-full', props.hidden && 'hidden')}>
      {label && (
        <Label
          className='block text-sm font-bold'
          htmlFor={props.id || props.name}
        >
          {label}
          {props.required && <span className='pl-1 text-red-500'>*</span>}
        </Label>
      )}
      <div className='relative flex items-center'>
        <textarea
          id={props.id || props.name}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-muted bg-transparent px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground',
            props.disabled && 'cursor-not-allowed bg-gray-100',
            props.readOnly && 'cursor-not-allowed',
            className
          )}
          ref={ref}
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {onUpdateButtonClick && (
          <Button
            variant='outline'
            size='icon'
            className='absolute right-0 top-0 -translate-x-1/2 transform border-none'
            onClick={onUpdateButtonClick}
          >
            <Pencil />
          </Button>
        )}
      </div>
      {error && error?.message && (
        <Label className={'text-xs text-destructive'}>
          {error.message == 'Required'
            ? t('common.form.required')
            : error.message}
        </Label>
      )}
    </div>
  );
};

TextArea.displayName = 'TextArea';

function transformTextAreaValue(
  value: string,
  capitalize: boolean = false,
  trim: boolean = true
): string | null {
  if (capitalize && value) {
    value = value
      .split('\n')
      .map((line) => line.charAt(0).toUpperCase() + line.slice(1))
      .join('\n');
  }

  if (trim && value) {
    value = value.trim();
  }

  if (value === '') {
    return null;
  }

  return value;
}

export { TextArea };
