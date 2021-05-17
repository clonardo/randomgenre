import { useSession } from 'next-auth/client';

/**
 * If logged in, return the user ID
 */
export function useUserId() {
  const [session] = useSession();

  /*
  if (session && session.user) {
    console.log(`Session user: ${JSON.stringify(session.user, null, 2)}`);
  }
  */

  return session && session.user && (session.user as any).id
    ? (session.user as any).id
    : null;
}
