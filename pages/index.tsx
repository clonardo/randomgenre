import { GetServerSideProps, NextApiHandler } from 'next';
import { useGenres } from '../context/genre-context';
import { GenreList } from '../components/genre-list';
import { parseUser } from '../utils/parse-user';

const content = {
  marginTop: '100px'
};

const SAMPLEDATA = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
];

// DiscordUser
interface IndexProps {
  userId: string;
  username: string;
}

export default function Index({ userId, username }: IndexProps) {
  const { genres, setGenres, isLoading } = useGenres();

  return (
    <div style={content}>
      {username && (
        <div className="text-center mb-5">
          <h1>
            Hey, {username} -- {userId}
          </h1>
        </div>
      )}

      {genres && (
        <div>
          <pre>{JSON.stringify(genres, null, 2)}</pre>
        </div>
      )}

      <div>
        <GenreList displayTitle="Stuff" items={SAMPLEDATA} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IndexProps> =
  async function (ctx) {
    const user = parseUser(ctx);

    if (!user) {
      return {
        redirect: {
          destination: '/api/oauth',
          permanent: false
        }
      };
    } else {
      console.log(`-- Discord user: ${JSON.stringify(user, null, 2)}`);

      return { props: { userId: user.id, username: user.username } };
    }
  };
