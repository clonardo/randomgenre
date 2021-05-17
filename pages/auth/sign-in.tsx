import { signIn } from 'next-auth/client';
import { Layout, PageHeader, Result, Button } from 'antd';

const { Content } = Layout;

/*
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
*/

export default function SignIn() {
  return (
    <Content style={{ padding: '0 50px' }}>
      <div className="light-body-bg signin-box">
        <PageHeader title="Do I know you?" />
        <Result
          status="warning"
          title="You must be signed in to view this page"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign In
            </Button>
          ]}
        />
      </div>
    </Content>
  );
}
