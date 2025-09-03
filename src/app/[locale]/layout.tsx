import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {setRequestLocale} from "next-intl/server";

type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};


export default async function LocaleLayout({children, params}: Props) {
    const locale = (await params).locale;

    if(!hasLocale(routing.locales, locale)){
        notFound()
    }

    setRequestLocale(locale);

    const messages = require(`../../../messages/${locale}.json`);


    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}