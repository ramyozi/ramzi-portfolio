'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function ContactMe() {
  const t = useTranslations();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.header.contact')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder={t('common.contact.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder={t('common.contact.email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Textarea
              placeholder={t('common.contact.message')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <Button type="submit">{t('common.contact.submit')}</Button>
            {status === 'success' && <p className="text-green-500">{t('common.contact.success')}</p>}
            {status === 'error' && <p className="text-red-500">{t('common.contact.error')}</p>}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
