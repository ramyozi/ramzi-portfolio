export const metadata = {
  title: 'Sanity Studio',
  description: 'Content management for Ramzi’s Portfolio',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body className='min-h-screen bg-background text-foreground'>
        {children}
      </body>
    </html>
  );
}
