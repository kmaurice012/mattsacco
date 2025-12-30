import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('[Auth] Missing email or password');
          throw new Error('Please provide email and password');
        }

        try {
          await dbConnect();
          console.log('[Auth] Connected to database');
        } catch (dbError) {
          console.error('[Auth] Database connection error:', dbError);
          throw new Error('Database connection failed');
        }

        let user;
        try {
          user = await User.findOne({ email: credentials.email.toLowerCase() }).populate('saccoId');
          console.log('[Auth] User lookup result:', user ? `Found user: ${user.email}` : 'User not found');
        } catch (findError) {
          console.error('[Auth] User lookup error:', findError);
          throw new Error('Database query failed');
        }

        if (!user) {
          console.error('[Auth] User not found for email:', credentials.email);
          throw new Error('Invalid email or password');
        }

        if (!user.isActive) {
          console.error('[Auth] User account is inactive:', credentials.email);
          throw new Error('Your account has been deactivated. Please contact support.');
        }

        let isPasswordValid = false;
        try {
          isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log('[Auth] Password validation result:', isPasswordValid);
        } catch (bcryptError) {
          console.error('[Auth] Password comparison error:', bcryptError);
          throw new Error('Authentication failed');
        }

        if (!isPasswordValid) {
          console.error('[Auth] Invalid password for user:', credentials.email);
          throw new Error('Invalid email or password');
        }

        // Update last login
        try {
          user.lastLogin = new Date();
          await user.save();
          console.log('[Auth] Successfully logged in user:', credentials.email);
        } catch (saveError) {
          console.error('[Auth] Error updating last login:', saveError);
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          saccoId: user.saccoId?._id?.toString() || null,
          saccoName: user.saccoId?.name || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.saccoId = user.saccoId;
        token.saccoName = user.saccoName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.saccoId = token.saccoId as string | null;
        session.user.saccoName = token.saccoName as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
