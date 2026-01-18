import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        )

        if (!res.ok) {
          return null
        }

        const data = await res.json();
        console.log(data)

        return {
          id: String(data.user.id),
          email: data.user.email,
          nickname: data.user.nickname,
          avatar: data.user.avatar,
          accessToken: data.accessToken,
        }
      },
    }),
  ],

  pages: {
    signIn: '/signin',
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User).accessToken
        token.id = (user as User).id
        token.email = (user as User).email
        token.nickname = (user as User).nickname
        token.avatar = (user as User).avatar
      }

      return token
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        nickname: token.nickname as string,
        avatar: token.avatar as string | null,
      };

      session.accessToken = token.accessToken as string

      return session
    },
  },
}
