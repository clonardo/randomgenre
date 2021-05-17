import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';
import { JWT } from 'next-auth/jwt';
import { DiscordUser } from '../../../utils/types';

// https://next-auth.js.org/configuration/options
const options: NextAuthOptions = {
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ],
  // database: process.env.DATABASE_URL,
  secret: process.env.JWT_SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  //   jwt: {
  //     secret: process.env.JWT_SECRET
  //   },

  // Enable debug messages in the console if you are having problems
  debug: false,
  callbacks: {
    session: async (session: any, user) => {
      // console.log(`SESSION CALLBACK: user: ${JSON.stringify(user, null, 2)}`);
      session.user.name = `${user.name}`;
      session.user.id = `${user.sub}`;
      session.user.image = user.picture;
      session.user.email = user.email;
      return Promise.resolve(session);
    }
  }
};

export default (req, res) => NextAuth(req, res, options);
