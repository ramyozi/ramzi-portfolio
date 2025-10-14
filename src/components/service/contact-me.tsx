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
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
      toast.success(t('common.toast.success'));
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(t('common.toast.error'));
    }
  };

  const mailLink = `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''}`;
  const githubLink = process.env.NEXT_PUBLIC_GITHUB_URL || '#';
  const linkedinLink = process.env.NEXT_PUBLIC_LINKEDIN_URL || '#';

  return (
    <section id='contact' className='scroll-mt-24'>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className='rounded-2xl border border-border/60 bg-card/80 shadow-lg backdrop-blur-md'>
          <CardHeader className='flex flex-col items-center gap-4'>
            <motion.div
              className='flex items-center justify-center gap-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href={mailLink}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Email'
              >
                <Mail className='h-6 w-6 text-muted-foreground transition-colors hover:text-primary' />
              </a>
              <a
                href={githubLink}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'
              >
                <Github className='h-6 w-6 text-muted-foreground transition-colors hover:text-primary' />
              </a>
              <a
                href={linkedinLink}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
              >
                <Linkedin className='h-6 w-6 text-muted-foreground transition-colors hover:text-primary' />
              </a>
            </motion.div>

            <div className='relative my-2 flex w-full items-center'>
              <div className='flex-grow border-t border-border'></div>
              <span className='px-3 text-sm text-muted-foreground'>
                {t('common.contactMe.or')}
              </span>
              <div className='flex-grow border-t border-border'></div>
            </div>

            <CardTitle className='text-2xl font-semibold text-primary'>
              {t('common.header.contact')}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className='flex flex-col gap-4 md:flex-row'>
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

              <Button
                type='submit'
                variant='default'
                className='flex items-center justify-center gap-2 py-2 transition-transform hover:scale-105'
              >
                <Send className='h-4 w-4' />
                {t('common.contactMe.form.submit')}
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
