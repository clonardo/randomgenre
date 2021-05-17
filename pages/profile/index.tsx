import { signOut, useSession } from 'next-auth/client';
import { useUserId } from '../../hooks/use-userid';
import { Avatar, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import GenreCtx, { useGenres } from '../../context/genre-context';
import { GenreSummary } from '../../containers/genre-summary';
const { SubMenu } = Menu;

const ShowUserId = () => {
  const userId = useUserId();
  return userId ? <div>User ID: {userId}</div> : <div>User ID Not Set!</div>;
};

interface IHeaderProps {
  avatarUrl: string;
  userId: string;
  userName: string;
}

const ProfileHeader = ({ avatarUrl, userId, userName }: IHeaderProps) => {
  const handleClick = (e: any) => {
    console.log('click ', e.key);
    if (e.key == 'signout') {
      console.log(`UID ${userId} SIGNING OUT`);
      signOut();
    }
  };
  return (
    <Layout.Header>
      <Menu
        onClick={handleClick}
        theme="light"
        mode="horizontal"
        className="flex-horizontal-header"
      >
        <Menu.Item key="signout" className="floating-menu-item">
          Sign Out - {userName}
        </Menu.Item>
        <Menu.Item key="avatar">
          <Avatar src={avatarUrl} alt={userName} />
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default function Profile() {
  const [session, loading] = useSession();
  const userId = useUserId();

  return (
    <GenreCtx>
      <main>
        <ProfileHeader
          avatarUrl={session.user?.image}
          userName={session.user?.name}
          userId={userId}
        />
        {/* <ShowUserId />
        <div className="aside-footer">
          <button onClick={(): Promise<void> => signOut()}>Sign out</button>
        </div> */}
        <GenreSummary />
      </main>
    </GenreCtx>
  );
}
