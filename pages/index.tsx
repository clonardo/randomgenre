import { GetServerSideProps, NextApiHandler } from 'next';

import SignIn from './auth/sign-in';
import { useSession } from 'next-auth/client';
import Profile from './profile';

export default function Index() {
  const [session, loading] = useSession();

  return !session ? <SignIn /> : <Profile />;
}
