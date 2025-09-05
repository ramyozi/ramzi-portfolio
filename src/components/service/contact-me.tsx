'use client';
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/text-area-input';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormValidator } from '@/hooks/use-form-validator';
import { Mail, Github, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export function ContactMe() {
  const t = useTranslations();
  const { emailValidation, stringValidation } = useFormValidator();

  const formSchema = useMemo(
    () =>
      z.object({
        senderName: stringValidation({ min: 2 }),
        email: emailValidation(),
        title: stringValidation({ min: 0 }),
        message: stringValidation({ min: 10 }),
      }),
    []
  );

  type FormData = z.infer<typeof formSchema>;

  const resolver: Resolver<FormData> = zodResolver(formSchema) as any;

  const form = useForm<FormData>({
    resolver,
    defaultValues: {
      senderName: '',
      email: '',
      title: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const recipientEmail =
        process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'default@example.com';
      const subject = `Contact form: ${data.title || 'No title'}`;
      const text = `
      Name: ${data.senderName || 'N/A'}
      Email: ${data.email || 'N/A'}
      Title: ${data.title || 'N/A'}
      Message:
      ${data.message || 'N/A'}
    `;

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipientEmail, subject, text }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      toast.success(
        t('common.toast.success', { default: 'Message sent successfully!' })
      );
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(
        t('common.toast.error', {
          default: 'Failed to send message. Please try again later.',
        })
      );
    }
  };

  const mailLink = `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''}`;
  const githubLink = process.env.NEXT_PUBLIC_GITHUB_URL || '#';
  const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_URL || '#';

  return (
    <section id='contact'>
      <Card>
        <CardHeader className='flex flex-col items-center gap-3'>
          <div className='flex items-center justify-center gap-6'>
            <a href={mailLink} target='_blank' rel='noopener noreferrer'>
              <Mail className='h-6 w-6 transition-colors hover:text-blue-500' />
            </a>
            <a href={githubLink} target='_blank' rel='noopener noreferrer'>
              <Github className='h-6 w-6 transition-colors hover:text-gray-700' />
            </a>
            <a href={linkedinLink} target='_blank' rel='noopener noreferrer'>
              <Linkedin className='h-6 w-6 transition-colors hover:text-blue-600' />
            </a>
          </div>
          <div className='relative my-4 flex w-full items-center'>
            <div className='flex-grow border-t border-gray-300'></div>
            <span className='px-3 text-sm text-gray-500'>
              {t('common.contactMe.or')}
            </span>
            <div className='flex-grow border-t border-gray-300'></div>
          </div>
          <CardTitle>{t('common.header.contact')}</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='flex items-center justify-between gap-4'>
              <Input
                label={t('common.contactMe.form.senderName')}
                placeholder={t('common.contactMe.form.senderName')}
                {...form.register('senderName')}
                formHook={form}
                required
              />
              <Input
                label={t('common.contactMe.form.email')}
                placeholder={t('common.contactMe.form.email')}
                {...form.register('email')}
                formHook={form}
                required
              />
            </div>

            <Input
              label={t('common.contactMe.form.title')}
              placeholder={t('common.contactMe.form.title')}
              {...form.register('title')}
              formHook={form}
            />

            <TextArea
              label={t('common.contactMe.form.message')}
              placeholder={t('common.contactMe.form.message')}
              {...form.register('message')}
              formHook={form}
              required
            />

            <Button type='submit'>{t('common.contactMe.form.submit')}</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
