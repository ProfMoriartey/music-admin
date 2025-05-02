import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@/server/root';
import { supabase } from './supabase';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      async headers() {
        const { data: { session } } = await supabase.auth.getSession();
        return {
          Authorization: session?.access_token ? `Bearer ${session.access_token}` : '',
        };
      },
    }),
  ],
}); 