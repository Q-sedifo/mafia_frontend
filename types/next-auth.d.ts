import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      nickname?: string | null;
      avatar?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    nickname?: string | null;
    avatar?: string | null;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    email: string;
    nickname?: string | null;
    avatar?: string | null;
  }
}