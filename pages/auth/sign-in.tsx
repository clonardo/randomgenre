import { signIn } from 'next-auth/client';

export default function SignIn() {
  return (
    <>
      <h1>Hey, stranger, Please sign in.</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  );
}
