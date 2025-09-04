'use client';
import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/text-area-input';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFormValidator,
  registerFormReset,
} from '@/hooks/use-form-validator';

export function ContactMe() {
  const t = useTranslations();
  const { emailValidation, stringValidation } = useFormValidator();

  const formSchema = useMemo(
    () =>
      z.object({
        senderName: stringValidation({ min: 2 }),
        email: emailValidation({ optional: false }),
        title: stringValidation({ optional: true }),
        message: stringValidation({ min: 10 }),
      }),
    []
  );

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: '',
      email: '',
      title: '',
      message: '',
    },
  });

  useEffect(() => {
    registerFormReset(form)();
  }, [form]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const recipientEmail =
        process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'default@example.com';
      const subject = `Formulaire de contact: ${data.title || 'Sans titre'}`;
      const text = `
        Nom: ${data.senderName || 'N/A'}
        E-mail: ${data.email || 'N/A'}
        Titre: ${data.title || 'N/A'}
        Message:
        ${data.message || 'N/A'}
      `;

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipientEmail, subject, text }),
      });

      if (!res.ok) {
        throw new Error("Échec de l'envoi du message");
      }

      alert('Message envoyé avec succès !');
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Échec de l'envoi du message. Veuillez réessayer plus tard.");
    }
  };

  return (
    <section id='contact'>
      <Card>
        <CardHeader>
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
