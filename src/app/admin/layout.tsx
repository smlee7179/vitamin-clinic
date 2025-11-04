'use client';

import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.Node
;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
